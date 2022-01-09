// A large number library which uses logarithms to store numbers up to 10^^900719925474099 (10^^Number.MAX_SAFE_INTEGER).
// Some accuracy is sacrificed if the number is small enough, however.

(function (globalScope) {
  'use strict';

  var tetrate = (a,b) => {
    if (b==1) {return a;}
    else {return a**tetrate(a,b-1);}
  }
  
  class Inferno {
    static Inf(v) {
      return new Inferno(v);
    }

    constructor(v) {
      if (v == null) {
        this.log = Number.NEGATIVE_INFINITY;
        this.val = 0;
      }
      if (v instanceof Inferno) {
        this.log = v.log;
        this.val = v.val;
      } else if (typeof v == 'string') {
        let parts = v.split('e');
        if (parts.length == 1) {
          // If there is no e, store the logarithm.
          this.log = Math.log10(v);
          this.val = v;
        } else if (parts[0].length == 0) {
          // If the e is the first character, store the number itself.
          this.val = this.log = Number(v.slice(1));
        } else {
          if (v.slice(0, v.indexOf('e')) == 1) {
            this.val = this.log = Number(
              new Inferno(v.slice(v.indexOf('e') + 1)).val
            );
          }
        }
      } else if (typeof v == 'number') {
        this.log = Math.log10(v);
        this.val = v;
      } else {
        this.log = Number.NEGATIVE_INFINITY;
        this.val = 0;
      }
    }
    
    static fromNum(v) {
      let temp = new Inferno();
      temp.log = Math.log10(v);
      temp.val = v;
      return temp;
    }
    
    static fromString(v) {
      let temp = new Inferno();
      let parts = v.split('e');
        if (parts.length == 1) {
          // If there is no e, store the logarithm.
          temp.log = Math.log10(v);
          temp.val = v;
        } else if (parts[0].length == 0) {
          // If the e is the first character, store the number itself.
          temp.val = temp.log = Number(v.slice(1));
        } else {
          if (v.slice(0, v.indexOf('e')) == 1) {
            temp.val = temp.log = Number(
              new Inferno(v.slice(v.indexOf('e') + 1)).val
            );
          }
        }
      return temp
    }
    static fromArray(v) {  // [A] = A, [A, B] = AeB, [A, B, C] = AeBeC, etc.
      let str = v[0];
      v = v.splice(0,1);
      for (let j in v) {
        str.concat("e" + j);
      }
      return Inferno.fromString(str);
    }
    
    static toString(v) {
      v = new Inferno(v);
      if (v.log == Number.NEGATIVE_INFINITY) {return '0';}
      if (v.log == Number.POSITIVE_INFINITY) {return 'Infinity';}
      if (v.log >= 1e21 || v.log <= -1e21) {return 'e' + toString(v.log);}
      if (v.log >= 21 || v.log < -6) {return (10 ** (v.log - Math.floor(v.log))).toString() + 'e' + Math.floor(v.log);}
      else {return (10 ** (v.log)).toString();}
    }
    
    toString() {
      return Inferno.toString(this);
    }
    
    static toNumber(v) {
      v = new Inferno(v);
      let z = [Number.MAX_SAFE_INTEGER]
      for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {z.push(10);}
      let k = Inferno.fromArray(z);
      if (v.log >= k) {return Number.POSITIVE_INFINITY;}
      if (v.log <= -k) {return 0;}
      else {return 10 ** v.log;}
    }
    
    toNumber() {
      return Inferno.toNumber(this);
    }
  }
})(this);
