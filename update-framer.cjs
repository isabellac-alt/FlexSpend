const fs = require('fs');

let flexTab = fs.readFileSync('src/components/FlexSpendTab/FlexSpendTab.tsx', 'utf8');
flexTab = flexTab.replace("import { useCallback, useEffect, useRef, useState } from 'react'", "import { useCallback, useEffect, useRef, useState } from 'react'\nimport { motion, AnimatePresence } from 'framer-motion'");

// Wrap the main content and hubs in AnimatePresence
flexTab = flexTab.replace(
  "{payLaterOpen ? (\n        <PayLaterHub\n          enterFromRect={payLaterEnterRect}\n          onClose={closePayLater}\n        />\n      ) : securedOpen ? (\n        <SecuredCreditHub\n          enterFromRect={securedEnterRect}\n          onClose={closeSecured}\n          balanceDollars={securedBalanceDollars}\n          onTopUp={openAddMoneyFromSecuredHub}\n        />\n      ) : (\n      <>\n      <div\n        ref={mainScrollRef}",
  `<AnimatePresence>
      {payLaterOpen && (
        <motion.div key="paylater" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
          <PayLaterHub
            enterFromRect={payLaterEnterRect}
            onClose={closePayLater}
          />
        </motion.div>
      )}
      {securedOpen && (
        <motion.div key="secured" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column' }}>
          <SecuredCreditHub
            enterFromRect={securedEnterRect}
            onClose={closeSecured}
            balanceDollars={securedBalanceDollars}
            onTopUp={openAddMoneyFromSecuredHub}
          />
        </motion.div>
      )}
      {!payLaterOpen && !securedOpen && (
      <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.2 } }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
      <div
        ref={mainScrollRef}`
);

// Close the AnimatePresence
flexTab = flexTab.replace(
  "        </nav>\n      </div>\n      </>\n      )}",
  "        </nav>\n      </div>\n      </motion.div>\n      )}\n      </AnimatePresence>"
);

// Convert fst__pot-secured to motion.button
flexTab = flexTab.replace(
  '<button\n                      ref={securedBtnRef}\n                      type="button"\n                      className="fst__pot-secured"\n                      onClick={openSecured}\n                    >',
  `<motion.button
                      layoutId="secured-card"
                      ref={securedBtnRef}
                      type="button"
                      className="fst__pot-secured"
                      onClick={openSecured}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >`
);
flexTab = flexTab.replace(
  '</button>\n                  </div>\n                </div>\n              </div>\n\n              <div className="fst__actions">',
  '</motion.button>\n                  </div>\n                </div>\n              </div>\n\n              <div className="fst__actions">'
);

// Inner elements of fst__pot-secured
flexTab = flexTab.replace(
  '<div className="fst__pot-secured-inner">',
  '<motion.div layoutId="secured-card-inner" className="fst__pot-secured-inner" transition={{ type: "spring", stiffness: 300, damping: 30 }}>'
);
flexTab = flexTab.replace(
  '</div>\n                    </motion.button>',
  '</motion.div>\n                    </motion.button>'
);

flexTab = flexTab.replace(
  '<p className="fst__pot-label">Secured Credit</p>',
  '<motion.p layoutId="secured-card-title" className="fst__pot-label" transition={{ type: "spring", stiffness: 300, damping: 30 }}>Secured Credit</motion.p>'
);

flexTab = flexTab.replace(
  '<div className="fst__amount-row">\n                            <span className="sym">$</span>\n                            <span className="num">{securedBalanceDollars}</span>\n                            <span className="sym">.00</span>\n                          </div>',
  `<motion.div layoutId="secured-card-amount" className="fst__amount-row" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                            <span className="sym">$</span>
                            <span className="num">{securedBalanceDollars}</span>
                            <span className="sym">.00</span>
                          </motion.div>`
);

flexTab = flexTab.replace(
  '<p className="fst__amount-sub">Ready to spend</p>',
  '<motion.p layoutId="secured-card-subtitle" className="fst__amount-sub" transition={{ type: "spring", stiffness: 300, damping: 30 }}>Ready to spend</motion.p>'
);

fs.writeFileSync('src/components/FlexSpendTab/FlexSpendTab.tsx', flexTab);

let hub = fs.readFileSync('src/components/FlexSpendTab/SecuredCreditHub.tsx', 'utf8');
hub = hub.replace("import { useLayoutEffect, useRef, useState } from 'react'", "import { useLayoutEffect, useRef, useState, useEffect } from 'react'\nimport { motion } from 'framer-motion'");

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
  '<div ref={cardRef} className="fst__schub-card">',
  '<motion.div layoutId="secured-card" ref={cardRef} className="fst__schub-card" transition={{ type: "spring", stiffness: 300, damping: 30 }}>'
);
hub = hub.replace(
  '</button>\n            </div>\n          </div>\n\n          <div',
  '</button>\n            </div>\n          </motion.div>\n\n          <div'
);

hub = hub.replace(
  '<div className="fst__schub-card-top">',
  '<motion.div layoutId="secured-card-inner" className="fst__schub-card-top" transition={{ type: "spring", stiffness: 300, damping: 30 }}>'
);
hub = hub.replace(
  '</p>\n              </div>\n            </div>\n            <div',
  '</p>\n              </div>\n            </motion.div>\n            <div'
);

hub = hub.replace(
  '<p className="fst__schub-card-name">Secured Credit</p>',
  '<motion.p layoutId="secured-card-title" className="fst__schub-card-name" transition={{ type: "spring", stiffness: 300, damping: 30 }}>Secured Credit</motion.p>'
);

hub = hub.replace(
  '<div className="fst__schub-amount-row">\n                  <span className="sym">$</span>\n                  <span className="num">{balanceDollars}</span>\n                  <span className="sym">.00</span>\n                </div>',
  `<motion.div layoutId="secured-card-amount" className="fst__schub-amount-row" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                  <span className="sym">$</span>
                  <span className="num">{balanceDollars}</span>
                  <span className="sym">.00</span>
                </motion.div>`
);

hub = hub.replace(
  '<p className="fst__schub-amount-sub">Ready to spend</p>',
  '<motion.p layoutId="secured-card-subtitle" className="fst__schub-amount-sub" transition={{ type: "spring", stiffness: 300, damping: 30 }}>Ready to spend</motion.p>'
);

fs.writeFileSync('src/components/FlexSpendTab/SecuredCreditHub.tsx', hub);

