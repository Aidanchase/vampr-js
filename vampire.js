class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(offspring) {
    this.offspring.push(offspring);
    offspring.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numOfVamps = 0;
    let currentVamp = this;

    while (currentVamp.creator) {
      currentVamp = currentVamp.creator
      numOfVamps++
    }
    return numOfVamps;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  vampireWithName(name) {
    if (this.name === name){
      return this;
    } 
    for (let children of this.offspring){
      if (children.vampireWithName(name)){
        return children.vampireWithName(name)
      }
    }
    return null;
  }

  // Returns the total number of vampires that exist
  get totalDescendents() {
    let counter = 0;
    for (let child of this.offspring) {
      counter += child.totalDescendents + 1;
    }
    return counter
  }

  // Returns an array of all the vampires that were converted after 1980


  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  get vampirians() {
    let ancestors = [];
    let pire = this;

    while (pire) {
      ancestors.push(pire);
      pire = pire.creator;
    }

    return ancestors;
  }

  closestCommonAncestor(vampire) {
    const myBlood = this.vampirians;
    let pire = vampire;

    while (!myBlood.includes(pire)) {
      pire = pire.creator;
    }

    return pire;
  }
  get allMillennialVampires() {
    let vamps = [];
    if (this.yearConverted > 1980) {
      vamps.push(this);
    }

    for (let children of this.offspring) {
      vamps = vamps.concat(children.allMillennialVampires);
    }
    
    return vamps;
  }

}


module.exports = Vampire;