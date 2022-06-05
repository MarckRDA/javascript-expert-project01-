class Pokemon {
  constructor ({ name, moves }) {
    this.name = name[0].toUpperCase() + name.substring(1)
    this.moves = moves
  }
}

module.exports = Pokemon
