#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const SKILL_NAME = 'mobile-screen-eval';
const SKILL_FILE = path.join(__dirname, '..', 'skills', `${SKILL_NAME}.skill`);

// Detect install target
// Claude Code looks for skills in ~/.claude/skills/ (global)
// or .claude/skills/ relative to cwd (project-scoped)
const args = process.argv.slice(2);
const isProject = args.includes('--project') || args.includes('-p');

const targetDir = isProject
  ? path.join(process.cwd(), '.claude', 'skills')
  : path.join(os.homedir(), '.claude', 'skills');

const targetFile = path.join(targetDir, `${SKILL_NAME}.skill`);

console.log(`\n📦 mobile-screen-eval installer\n`);

// Check skill file exists in package
if (!fs.existsSync(SKILL_FILE)) {
  console.error('❌ Skill file not found in package. Try reinstalling.');
  process.exit(1);
}

// Create target directory if needed
try {
  fs.mkdirSync(targetDir, { recursive: true });
} catch (err) {
  console.error(`❌ Could not create directory: ${targetDir}`);
  console.error(err.message);
  process.exit(1);
}

// Copy skill file
try {
  fs.copyFileSync(SKILL_FILE, targetFile);
} catch (err) {
  console.error(`❌ Could not copy skill file to: ${targetFile}`);
  console.error(err.message);
  process.exit(1);
}

const scope = isProject ? 'this project' : 'your account (global)';
console.log(`✅ Installed mobile-screen-eval to ${scope}`);
console.log(`   Location: ${targetFile}\n`);

if (isProject) {
  console.log(`💡 Tip: commit .claude/skills/ to share this skill with your team.\n`);
}

console.log(`🚀 How to use:`);
console.log(`   In Claude Code, Claude.ai, or any Claude interface:`);
console.log(`   → Upload a mobile screen (PNG, Figma frame, or description)`);
console.log(`   → Say "audit this screen" or "run mobile-screen-eval"`);
console.log(`   → Claude runs Nielsen + WCAG + mobile a11y and produces a full report\n`);

console.log(`📖 Three evaluation layers:`);
console.log(`   1. Nielsen's 10 usability heuristics`);
console.log(`   2. WCAG 2.1 AA accessibility`);
console.log(`   3. iOS HIG + Material Design platform a11y\n`);

console.log(`🔄 To update later: npx mobile-screen-eval@latest\n`);
