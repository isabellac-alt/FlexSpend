const fs = require('fs');

let flexTab = fs.readFileSync('src/components/FlexSpendTab/FlexSpendTab.tsx', 'utf8');

// Convert fst__pot-paylater to motion.button
flexTab = flexTab.replace(
  '<button\n                      ref={payLaterBtnRef}\n                      type="button"\n                      className="fst__pot-paylater"\n                      onClick={openPayLater}\n                    >',
  `<motion.button
                      layoutId="paylater-card"
                      ref={payLaterBtnRef}
                      type="button"
                      className="fst__pot-paylater"
                      onClick={openPayLater}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >`
);
flexTab = flexTab.replace(
  '</button>\n                    <motion.button\n                      layoutId="secured-card"',
  '</motion.button>\n                    <motion.button\n                      layoutId="secured-card"'
);

// Inner elements of fst__pot-paylater
flexTab = flexTab.replace(
  '<span className="fst__pot-paylater-inner">',
  '<motion.span layoutId="paylater-card-inner" className="fst__pot-paylater-inner" transition={{ type: "spring", stiffness: 300, damping: 30 }}>'
);
flexTab = flexTab.replace(
  '</span>\n                    </motion.button>',
  '</motion.span>\n                    </motion.button>'
);

flexTab = flexTab.replace(
  '<span className="fst__pot-label">Pay Later</span>',
  '<motion.span layoutId="paylater-card-title" className="fst__pot-label" transition={{ type: "spring", stiffness: 300, damping: 30 }}>Pay Later</motion.span>'
);

flexTab = flexTab.replace(
  '<span className="fst__amount-row">\n                            <span className="sym">$</span>\n                            <span className="num">500</span>\n                            <span className="sym">.00</span>\n                          </span>',
  `<motion.span layoutId="paylater-card-amount" className="fst__amount-row" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                            <span className="sym">$</span>
                            <span className="num">500</span>
                            <span className="sym">.00</span>
                          </motion.span>`
);

flexTab = flexTab.replace(
  '<span className="fst__amount-sub">Available to spend</span>',
  '<motion.span layoutId="paylater-card-subtitle" className="fst__amount-sub" transition={{ type: "spring", stiffness: 300, damping: 30 }}>Available to spend</motion.span>'
);

fs.writeFileSync('src/components/FlexSpendTab/FlexSpendTab.tsx', flexTab);

let hub = fs.readFileSync('src/components/FlexSpendTab/PayLaterHub.tsx', 'utf8');
hub = hub.replace("import { useLayoutEffect, useRef, useState } from 'react'", "import { useRef, useState, useEffect } from 'react'\nimport { motion } from 'framer-motion'");

// Remove the manual FLIP animation since we are using framer-motion
hub = hub.replace(/  useLayoutEffect\(\(\) => \{[\s\S]*?\}, \[enterFromRect\]\)/, `  useEffect(() => {
    if (!enterFromRect) {
      setRevealDeferred(true)
      return
    }
    const timer = setTimeout(() => setRevealDeferred(true), 300)
    return () => clearTimeout(timer)
  }, [enterFromRect])`);

hub = hub.replace(
  "const rootClass = 'fst__plhub' + (fromPot ? ' fst__plhub--from-pot' : '')",
  "const rootClass = 'fst__plhub'"
);
hub = hub.replace(
  "const fromPot = Boolean(enterFromRect)\n  const [revealDeferred, setRevealDeferred] = useState(() => !enterFromRect)",
  "const [revealDeferred, setRevealDeferred] = useState(() => !enterFromRect)"
);

hub = hub.replace(
  '<div ref={cardRef} className="fst__plhub-card">',
  '<motion.div layoutId="paylater-card" ref={cardRef} className="fst__plhub-card" transition={{ type: "spring", stiffness: 300, damping: 30 }}>'
);
hub = hub.replace(
  '</button>\n            </div>\n          </div>\n\n          <div',
  '</button>\n            </div>\n          </motion.div>\n\n          <div'
);

hub = hub.replace(
  '<div className="fst__plhub-card-row">',
  '<motion.div layoutId="paylater-card-inner" className="fst__plhub-card-row" transition={{ type: "spring", stiffness: 300, damping: 30 }}>'
);
hub = hub.replace(
  '</p>\n              </div>\n            </div>\n            <div',
  '</p>\n              </div>\n            </motion.div>\n            <div'
);

hub = hub.replace(
  '<p className="fst__plhub-card-label">Pay Later</p>',
  '<motion.p layoutId="paylater-card-title" className="fst__plhub-card-label" transition={{ type: "spring", stiffness: 300, damping: 30 }}>Pay Later</motion.p>'
);

hub = hub.replace(
  '<div className="fst__plhub-amount-row">\n                  <span className="sym">$</span>\n                  <span className="num">500</span>\n                  <span className="sym">.00</span>\n                </div>',
  `<motion.div layoutId="paylater-card-amount" className="fst__plhub-amount-row" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                  <span className="sym">$</span>
                  <span className="num">500</span>
                  <span className="sym">.00</span>
                </motion.div>`
);

hub = hub.replace(
  '<p className="fst__plhub-amount-sub">Available to spend</p>',
  '<motion.p layoutId="paylater-card-subtitle" className="fst__plhub-amount-sub" transition={{ type: "spring", stiffness: 300, damping: 30 }}>Available to spend</motion.p>'
);

fs.writeFileSync('src/components/FlexSpendTab/PayLaterHub.tsx', hub);

