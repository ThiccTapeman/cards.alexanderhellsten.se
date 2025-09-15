import achievements from "../config/Achievements.json";

export class Achievements {
  constructor() {
    this.data = achievements.achievements;
  }

  GetAchievementRewards(type, value) {
    const rewards = {};

    for (const category of this.data) {
      for (const a of category.content) {
        if (a.type !== type) continue;

        let passed = false;
        if (a.method === ">=") passed = value >= a.goal;
        if (a.method === "<=") passed = value <= a.goal;
        if (a.method === "==") passed = value === a.goal;

        if (passed) {
          if (!rewards[a.rewardType]) rewards[a.rewardType] = 0;
          rewards[a.rewardType] += a.reward;
        }
      }
    }

    return rewards;
  }
}

export class AchievementsData {
  title;
  description;
  type;
  method;
  goal;
  rewardType;
  rewardDescription;
  reward;

  constructor(achievement) {
    this.title = achievement.title;
    this.description = achievement.description;
    this.type = achievement.type;
    this.method = achievement.method;
    this.goal = achievement.goal;
    this.rewardType = achievement.rewardType;
    this.rewardDescription = achievement.rewardDescription;
    this.reward = achievement.reward;
  }

  IsAchieved(deck, cash) {}
}
