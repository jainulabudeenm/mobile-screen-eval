#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const SKILL_NAME = 'mobile-screen-eval';
const SKILL_FILE = path.join(__dirname, '..', 'skills', `${SKILL_NAME}.skill`);

const args = process.argv.slice(2);
const isProject = args.includes('--project') || args.includes('-p');

console.log(`\n📦 mobile-screen-eval installer\n`);

// Check skill file exists in package
if (!fs.existsSync(SKILL_FILE)) {
  console.error('❌ Skill file not found in package. Try reinstalling.');
  process.exit(1);
}

// Install targets — Claude Code uses ~/.agents/skills/, Claude.ai uses ~/.claude/skills/
// Install to both so it works everywhere
const targets = isProject
  ? [
      path.join(process.cwd(), '.agents', 'skills'),
      path.join(process.cwd(), '.claude', 'skills'),
    ]
  : [
      path.join(os.homedir(), '.agents', 'skills'),
      path.join(os.homedir(), '.claude', 'skills'),
    ];

let anySuccess = false;

for (const targetDir of targets) {
  const targetFile = path.join(targetDir, `${SKILL_NAME}.skill`);
  try {
    fs.mkdirSync(targetDir, { recursive: true });
    fs.copyFileSync(SKILL_FILE, targetFile);
    console.log(`✅ Installed to: ${targetFile}`);
    anySuccess = true;
  } catch (err) {
    // Skip silently if source and destination are the same
    if (err.code === 'EEXIST' || err.message.includes('identical')) {
      console.log(`✅ Already in place: ${targetFile}`);
      anySuccess = true;
    } else {
      console.warn(`⚠️  Could not install to ${targetDir}: ${err.message}`);
    }
  }
}

if (!anySuccess) {
  console.error('❌ Installation failed. Try running with sudo or check folder permissions.');
  process.exit(1);
}

if (isProject) {
  console.log(`\n💡 Tip: commit .agents/skills/ and .claude/skills/ to share with your team.\n`);
}

console.log(`\n🚀 How to use:`);
console.log(`   In Claude Code, Claude.ai, or any Claude interface:`);
console.log(`   → Upload a mobile screen (PNG, Figma frame, or description)`);
console.log(`   → Say "run mobile-screen-eval on this screen"`);
console.log(`   → Claude runs Nielsen + WCAG + mobile a11y and produces a full report\n`);

console.log(`📖 Three evaluation layers:`);
console.log(`   1. Nielsen's 10 usability heuristics`);
console.log(`   2. WCAG 2.1 AA accessibility`);
console.log(`   3. iOS HIG + Material Design platform a11y\n`);

console.log(`🔄 To update later: npx mobile-screen-eval@latest\n`);
