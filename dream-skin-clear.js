/**
 * Name: Dream Skin 原图增强
 * Description: 给 Dream Skin 加一个设置页，调节盖在背景图上的面板透明度。删除此文件即恢复。
 * Author: shully
 */
(function () {
  const KEY = "shully:dream-skin-clear:settings";
  const STYLE_ID = "codex-plus-ext-dream-skin-clear";
  // 以后加新选项：在这里加一项，页面会自动出现对应控件
  const OPTIONS = [
    { id: "enabled", type: "toggle", label: "启用原图增强", desc: "关闭后恢复 Dream Skin 原版效果", def: true },
    { id: "panel", type: "range", label: "主面板透明度", desc: "盖在背景图上的白色面板。0 = 完全看原图，100 = 原版白板", def: 15, min: 0, max: 100 },
    { id: "hideName", type: "toggle", label: "隐藏主题名", desc: "隐藏首页标题上方的主题名字（如「IU 花嫁」）", def: false },
    { id: "hideTagline", type: "toggle", label: "隐藏主题标语", desc: "隐藏首页标题下方的一行说明文字", def: false },
    { id: "panelAlt", type: "range", label: "次级面板透明度", desc: "侧栏、卡片等次级面板", def: 20, min: 0, max: 100 },
  ];
  const load = () => {
    const d = Object.fromEntries(OPTIONS.map((o) => [o.id, o.def]));
    try { return { ...d, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch { return d; }
  };
  let cfg = load();
  const save = () => localStorage.setItem(KEY, JSON.stringify(cfg));

  function apply() {
    let css = "";
    if (cfg.enabled) {
      const p = cfg.panel / 100, a = cfg.panelAlt / 100;
      css += `html[data-dream-skin=active]{--ds-upload-panel-alpha:${p} !important;--ds-upload-bg-alpha:${p} !important;--ds-upload-panel-alt-alpha:${a} !important;}`;
    }
    if (cfg.hideName) css += `[data-ds-part="home-hero"]::before{display:none !important;content:none !important;}`;
    if (cfg.hideTagline) css += `[data-ds-part="home-hero"]::after{display:none !important;content:none !important;}`;
    let s = document.getElementById(STYLE_ID);
    if (!css) { s?.remove(); return; }
    if (!s) {
      s = document.createElement("style");
      s.id = STYLE_ID;
      s.setAttribute("data-codex-plus-ext", "");
      (document.head || document.documentElement).appendChild(s);
    }
    s.textContent = css;
  }
  apply();

  const cp = window.codexPlus;
  if (!cp) return;

  const disposePage = cp.registerPage(
    {
      title: "Dream Skin 原图增强",
      render: function renderPage({ container }) {
        container.innerHTML = "";
        for (const o of OPTIONS) {
          const row = document.createElement("div");
          row.className = "codex-plus-row";
          row.style.cssText = "display:flex;align-items:center;justify-content:space-between;gap:16px";
          row.innerHTML = `<div><div class="codex-plus-row-title"></div><div class="codex-plus-row-description"></div></div><div class="ctl" style="display:flex;align-items:center;gap:8px"></div>`;
          row.querySelector(".codex-plus-row-title").textContent = o.label;
          row.querySelector(".codex-plus-row-description").textContent = o.desc;
          const ctl = row.querySelector(".ctl");
          if (o.type === "toggle") {
            const sw = document.createElement("button");
            sw.type = "button";
            sw.setAttribute("role", "switch");
            const knob = document.createElement("span");
            sw.append(knob);
            const paint = () => {
              const on = !!cfg[o.id];
              sw.setAttribute("aria-checked", String(on));
              sw.style.cssText = `all:unset;box-sizing:border-box;width:40px;height:22px;border-radius:11px;cursor:pointer;position:relative;flex:none;transition:background .15s;background:${on ? "#0a84ff" : "rgba(120,120,128,.35)"}`;
              knob.style.cssText = `position:absolute;top:2px;left:${on ? 20 : 2}px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);transition:left .15s`;
            };
            paint();
            sw.onclick = () => { cfg[o.id] = !cfg[o.id]; paint(); save(); apply(); };
            ctl.append(sw);
          } else {
            const range = document.createElement("input");
            range.type = "range"; range.min = o.min; range.max = o.max; range.step = 1; range.value = cfg[o.id];
            range.style.cssText = "-webkit-appearance:auto;appearance:auto;width:200px;accent-color:#0a84ff;background:transparent";
            const num = document.createElement("input");
            num.type = "number"; num.min = o.min; num.max = o.max; num.step = 1; num.value = cfg[o.id];
            num.style.cssText = "width:56px;padding:3px 6px;border-radius:6px;border:1px solid var(--codex-plus-border,rgba(0,0,0,.2));background:var(--codex-plus-bg-elevated,#fff);color:var(--codex-plus-text,inherit);text-align:right;font:inherit";
            const pct = document.createElement("span");
            pct.textContent = "%";
            const set = (v, from) => {
              v = Math.round(Number(v));
              if (!Number.isFinite(v)) return;
              v = Math.min(o.max, Math.max(o.min, v));
              cfg[o.id] = v;
              if (from !== range) range.value = v;
              if (from !== num) num.value = v;
              save(); apply();
            };
            range.oninput = () => set(range.value, range);
            num.oninput = () => { if (num.value !== "") set(num.value, num); };
            num.onchange = () => { set(num.value === "" ? cfg[o.id] : num.value); num.value = cfg[o.id]; };
            ctl.append(range, num, pct);
          }
          container.append(row);
        }
        const reset = document.createElement("button");
        reset.textContent = "恢复默认";
        reset.style.cssText = "margin-top:12px;padding:6px 14px;border-radius:8px;border:1px solid var(--codex-plus-border);background:var(--codex-plus-bg-elevated);color:var(--codex-plus-text);cursor:pointer";
        reset.onclick = () => { localStorage.removeItem(KEY); cfg = load(); apply(); cp.toast("已恢复默认", { type: "success" }); renderPage({ container }); };
        container.append(reset);
      },
    },
    { navLabel: "Dream Skin 原图增强", icon: "✿", id: "settings" },
  );

  cp.onCleanup(() => { try { disposePage?.(); } catch {} document.getElementById(STYLE_ID)?.remove(); });
})();
