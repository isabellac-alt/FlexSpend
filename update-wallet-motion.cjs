const fs = require('fs');

const spring = "{ type: 'spring', stiffness: 350, damping: 35, mass: 1 }";

let flexTab = fs.readFileSync('src/components/FlexSpendTab/FlexSpendTab.tsx', 'utf8');

// Update AnimatePresence transitions
flexTab = flexTab.replace(
  /transition=\{\{ type: 'spring', stiffness: 300, damping: 30 \}\}/g,
  `transition=${spring}`
);
flexTab = flexTab.replace(
  /transition=\{\{ type: "spring", stiffness: 300, damping: 30 \}\}/g,
  `transition=${spring}`
);

// Add whileTap to buttons
flexTab = flexTab.replace(
  /className="fst__pot-paylater"\n                      onClick=\{openPayLater\}\n                      transition=/g,
  `className="fst__pot-paylater"\n                      onClick={openPayLater}\n                      whileTap={{ scale: 0.96 }}\n                      transition=`
);

flexTab = flexTab.replace(
  /className="fst__pot-secured"\n                      onClick=\{openSecured\}\n                      transition=/g,
  `className="fst__pot-secured"\n                      onClick={openSecured}\n                      whileTap={{ scale: 0.96 }}\n                      transition=`
);

// Make the main view scale down more elegantly
flexTab = flexTab.replace(
  /initial=\{\{ opacity: 0, scale: 0.96, y: 15 \}\} animate=\{\{ opacity: 1, scale: 1, y: 0 \}\} exit=\{\{ opacity: 0, scale: 0.96, y: 15 \}\}/g,
  `initial={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(4px)' }} animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(4px)' }}`
);

fs.writeFileSync('src/components/FlexSpendTab/FlexSpendTab.tsx', flexTab);

let plHub = fs.readFileSync('src/components/FlexSpendTab/PayLaterHub.tsx', 'utf8');
plHub = plHub.replace(
  /transition=\{\{ type: "spring", stiffness: 300, damping: 30 \}\}/g,
  `transition=${spring}`
);
plHub = plHub.replace(
  /boxShadow: '0 12px 32px rgba\(0,0,0,0.12\)'/g,
  `boxShadow: '0 20px 40px rgba(0,0,0,0.15)'`
);
fs.writeFileSync('src/components/FlexSpendTab/PayLaterHub.tsx', plHub);

let scHub = fs.readFileSync('src/components/FlexSpendTab/SecuredCreditHub.tsx', 'utf8');
scHub = scHub.replace(
  /transition=\{\{ type: "spring", stiffness: 300, damping: 30 \}\}/g,
  `transition=${spring}`
);
scHub = scHub.replace(
  /boxShadow: '0 12px 32px rgba\(71,32,28,0.12\)'/g,
  `boxShadow: '0 20px 40px rgba(71,32,28,0.15)'`
);
fs.writeFileSync('src/components/FlexSpendTab/SecuredCreditHub.tsx', scHub);

