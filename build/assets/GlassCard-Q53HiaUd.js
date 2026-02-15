import{j as r}from"./index-BnLffU6m.js";import"./vendor-D6EHgqcQ.js";import{m as i}from"./utils-BFQq9nJv.js";const m=({children:s,className:e="",hoverable:a=!0,animation:t={},onClick:o,...n})=>{const l={...{initial:{opacity:0,y:20,scale:.95},animate:{opacity:1,y:0,scale:1},exit:{opacity:0,y:-20,scale:.95},transition:{duration:.4,ease:[.23,1,.32,1]}},...t},d=a?"hover:bg-white/20 hover:-translate-y-1 hover:shadow-2xl dark:hover:bg-white/10":"";return r.jsxDEV(i.div,{className:`
        relative overflow-hidden rounded-2xl
        border border-white/20 dark:border-gray-700/30
        bg-white/10 dark:bg-black/20
        backdrop-blur-xl
        shadow-xl
        transition-all duration-300
        ${d}
        ${o?"cursor-pointer":""}
        ${e}
      `,onClick:o,...l,...n,children:[r.jsxDEV("div",{className:"absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"},void 0,!1,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:53,columnNumber:7},void 0),r.jsxDEV("div",{className:"relative z-10",children:s},void 0,!1,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:56,columnNumber:7},void 0),a&&r.jsxDEV("div",{className:"absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none",children:r.jsxDEV("div",{className:"absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10"},void 0,!1,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:63,columnNumber:11},void 0)},void 0,!1,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:62,columnNumber:9},void 0)]},void 0,!0,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:36,columnNumber:5},void 0)},x=({children:s,className:e="",...a})=>r.jsxDEV(m,{className:`p-8 ${e}`,hoverable:!1,...a,children:s},void 0,!1,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:75,columnNumber:5},void 0),v=({children:s,variant:e="primary",className:a="",disabled:t=!1,...o})=>{const n={primary:"bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30",secondary:"bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-500/30 hover:bg-violet-500/30",success:"bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30",danger:"bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30 hover:bg-rose-500/30",ghost:"bg-white/10 text-gray-700 dark:text-gray-300 border-white/20 hover:bg-white/20"};return r.jsxDEV(i.button,{className:`
        relative px-6 py-3 rounded-xl
        border backdrop-blur-md
        font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${n[e]}
        ${a}
      `,whileHover:t?{}:{scale:1.02,y:-2},whileTap:t?{}:{scale:.98},disabled:t,...o,children:s},void 0,!1,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:104,columnNumber:5},void 0)},g=({className:s="",icon:e,...a})=>r.jsxDEV("div",{className:"relative",children:[e&&r.jsxDEV("div",{className:"absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400",children:e},void 0,!1,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:130,columnNumber:9},void 0),r.jsxDEV("input",{className:`
          w-full px-4 py-3 rounded-xl
          ${e?"pl-11":""}
          bg-white/30 dark:bg-black/30
          backdrop-blur-md
          border border-white/20 dark:border-gray-700/30
          text-gray-900 dark:text-gray-100
          placeholder-gray-500 dark:placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50
          transition-all duration-200
          ${s}
        `,...a},void 0,!1,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:134,columnNumber:7},void 0)]},void 0,!0,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:128,columnNumber:5},void 0),y=({children:s,variant:e="default",className:a=""})=>{const t={default:"bg-white/20 text-gray-700 dark:text-gray-300",primary:"bg-cyan-500/20 text-cyan-700 dark:text-cyan-300",success:"bg-emerald-500/20 text-emerald-700 dark:text-emerald-300",warning:"bg-amber-500/20 text-amber-700 dark:text-amber-300",danger:"bg-rose-500/20 text-rose-700 dark:text-rose-300"};return r.jsxDEV("span",{className:`
      inline-flex items-center px-3 py-1 rounded-full
      text-xs font-medium backdrop-blur-md
      border border-white/20 dark:border-gray-700/30
      ${t[e]}
      ${a}
    `,children:s},void 0,!1,{fileName:"/Users/mohammedaashik/Documents/PROJECT/Drug_Discovery_with_Intel_AI/src/components/ui/GlassCard.jsx",lineNumber:166,columnNumber:5},void 0)};export{y as G,v as a,m as b,x as c,g as d};
