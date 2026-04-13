const fs = require('fs');

let flexTab = fs.readFileSync('src/components/FlexSpendTab/FlexSpendTab.tsx', 'utf8');
flexTab = flexTab.replace(/transition=\{ type: 'spring', stiffness: 350, damping: 35, mass: 1 \}/g, "transition={{ type: 'spring', stiffness: 350, damping: 35, mass: 1 }}");
fs.writeFileSync('src/components/FlexSpendTab/FlexSpendTab.tsx', flexTab);

let plHub = fs.readFileSync('src/components/FlexSpendTab/PayLaterHub.tsx', 'utf8');
plHub = plHub.replace(/transition=\{ type: 'spring', stiffness: 350, damping: 35, mass: 1 \}/g, "transition={{ type: 'spring', stiffness: 350, damping: 35, mass: 1 }}");
fs.writeFileSync('src/components/FlexSpendTab/PayLaterHub.tsx', plHub);

let scHub = fs.readFileSync('src/components/FlexSpendTab/SecuredCreditHub.tsx', 'utf8');
scHub = scHub.replace(/transition=\{ type: 'spring', stiffness: 350, damping: 35, mass: 1 \}/g, "transition={{ type: 'spring', stiffness: 350, damping: 35, mass: 1 }}");
fs.writeFileSync('src/components/FlexSpendTab/SecuredCreditHub.tsx', scHub);
