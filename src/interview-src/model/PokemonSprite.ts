export class PokemonSprite {
  public label = '';
  public url = '';

  constructor(label?: string, url?: string) {
    if (typeof (label) === 'string') {
      this.label = label;
    }
    if (typeof (url) === 'string') {
      this.url = url;
    }
  }

}