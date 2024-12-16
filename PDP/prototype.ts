abstract class NPC {
    name: string;
    health: number;
    attackPower: number;
  
    constructor(name: string, health: number, attackPower: number) {
      this.name = name;
      this.health = health;
      this.attackPower = attackPower;
    }
  
    abstract clone(): NPC;
  
    display(): void {
      console.log(`${this.name}, ${this.health}, ${this.attackPower}`);
    }
  }
  
  class Zombie extends NPC {
    constructor() {
      super("Zombie", 50, 10);
    }
  
    clone(): Zombie {
      return new Zombie();
    }
  }
  
  class Goblin extends NPC {
    constructor() {
      super("Goblin", 30, 15);
    }
  
    clone(): Goblin {
      return new Goblin();
    }
  }
  
  
  const zombiePrototype = new Zombie();
  const goblinPrototype = new Goblin();
  
  const npc1 = zombiePrototype.clone();
  const npc2 = goblinPrototype.clone();
  const npc3 = zombiePrototype.clone();
  
  npc3.health = 60;
  
  npc1.display();
  npc2.display();
  npc3.display();