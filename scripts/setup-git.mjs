import { spawnSync } from "node:child_process";

function git(...args) {
  return spawnSync("git", args, { encoding: "utf8" });
}

const insideRepository = git("rev-parse", "--is-inside-work-tree");
if (insideRepository.status !== 0) {
  console.error("Git 저장소 안에서 실행해 주세요.");
  process.exit(1);
}

const hookConfig = git("config", "--local", "core.hooksPath", ".githooks");
if (hookConfig.status !== 0) {
  console.error(hookConfig.stderr.trim() || "Git hooks 설정에 실패했습니다.");
  process.exit(1);
}

const userName = git("config", "--get", "user.name").stdout.trim();
const userEmail = git("config", "--get", "user.email").stdout.trim();
const remotes = git("remote", "-v").stdout.trim();

console.log("Git hooks가 활성화되었습니다: .githooks");
console.log(`작성자: ${userName || "미설정"} <${userEmail || "미설정"}>`);

if (!userName || !userEmail) {
  console.log("커밋 전에 user.name과 user.email을 설정해 주세요.");
}

if (!remotes) {
  console.log("원격 저장소가 없습니다. 연결 예시:");
  console.log("git remote add origin https://github.com/<username>/<repository>.git");
} else {
  console.log(remotes);
}
