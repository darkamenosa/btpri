// ----------------
// Data
// ----------------

const products = {
  bt_me: {
    name: 'Me',
    price: 6
  },
  bt_sa_te_tac: {
    name: 'Sa tế tắc',
    price: 6
  },
  bt_tron_tac: {
    name: 'Trộn tắc',
    price: 6
  },
  bt_bo: {
    name: 'Bơ',
    price: 10
  },
  bt_sa_te_toi: {
    name: 'Sa tế tỏi',
    price: 6
  },
  bt_muoi_dau: {
    name: 'Muối đậu',
    price: 6
  },
  bt_deo_cay: {
    name: 'Dẻo cay',
    price: 25
  },
  bt_deo_tom: {
    name: 'Dẻo tôm',
    price: 27
  },
  bt_deo_me: {
    name: 'Dẻo me',
    price: 25
  },
  muoi_tom: {
    name: 'Muối tôm',
    price: 80
  },
  muoi_chay: {
    name: 'Muối chay',
    price: 60
  },
  bt_cha_bong: {
    name: 'Chà bông',
    price: 6
  },
  bt_phoi_suong: {
    name: 'Phơi sương',
    price: 35
  },
  bt_tron_muoi_ot: {
    name: 'Tròn muối ớt',
    price: 28
  },
  bt_ong_tom: {
    name: 'Ống tôm',
    price: 5
  },
  bt_vuong: {
    name: 'Bánh tráng vuông',
    price: 28
  },
  chum_ruot: {
    name: 'Chùm ruột',
    price: 33
  },
  mut_me: {
    name: 'Mứt me',
    price: 50
  },
  kho_ga: {
    name: 'Khô gà',
    price: 230
  },
};

// ----------------
// Functions
// ----------------

function itemLine({ product, quantity }) {
  const { name, price } = product;
  const totalPrice = quantity * price;

  return name + ': ' + quantity + ' * ' + price + 'k = ' + totalPrice +'k\n';
}

function breakLine() {
  return '____________________\n';
}

function sumLine(total) {
  return 'Tổng tiền hàng: ' + total + 'k\n';
}


function buildItemsBlock(items) {
  return items
    .map(itemLine)
    .join('')
}

function computeTotal(items) {
  return items
          .map(item => item.quantity * item.product.price)
          .reduce((acc, curr) => acc + curr, 0)
}

function buildResponse(items) {
  // Items example:
  // [ 
  //    {
  //       product: { name: 'Bơ', price: 10 },
  //       quantity: 10
  //    }
  // ]
  
  // prettier-ignore 
  return buildItemsBlock(items) 
       + breakLine() 
       + sumLine(computeTotal(items))
}

function breakComma(sentence) {
  return sentence.split(',')
}

function breakSentence(sentence) {
  return sentence
            .replace(/\n|vs|với|voi|va|\+/g, ',')
            .replace(/\d+\s*me/g, '$&,')
            .replace(/\d+\s*muối/g, '$&,')
            .replace(/\d+\s*muoi/g, '$&,')
            .replace(/\d+\s*bo/g, '$&,')
            .replace(/\d+\s*bơ/g, '$&,')
            .replace(/\d+\s*khô gà/g, '$&,')
            .replace(/\d+\s*kho ga/g, '$&,')
            .replace(/\d+\s*ot tac/g, '$&,')
            .replace(/\d+\s*tac/g, '$&,')
            .replace(/\d+\s*tắc/g, '$&,')
            .replace(/\d+\s*tắt/g, '$&,')
            .replace(/\d+\s*tat/g, '$&,')

}

function matchCondition(line) {
  return function ({regex}) {
    return line ? line.match(regex) : false
  }
}

function detectProduct(line) {
  const testConditions = [
    { regex: /me|bánh tráng me|bt me|me/, output: 'bt_me'},
    { regex: /bt muối|bánh tráng muối đậu|bt muoi|muoi dau/, output: 'bt_muoi_dau'},
    { regex: /tế tắc|tế tắt|sa tế tắc|sa te tac|sate ớt cay|ot cay/, output: 'bt_sa_te_tac'},
    { regex: /trộn tắc|trộn tắt|tron tat|bánh tráng trộn|tron tac|bt tron|tron/, output: 'bt_tron_tac'},
    { regex: /bơ|bánh bơ|bánh tráng bơ|banh trang bo|bo/, output: 'bt_bo'},
    { regex: /tỏi|toi|bánh tỏi|sate toi|sa tế tỏi|bánh tráng sa tế tỏi|bánh tráng tỏi/, output: 'bt_sa_te_toi'},
    { regex: /dẻo cay|deo cay|cay dẻo|cay deo/, output: 'bt_deo_cay'},
    { regex: /dẻo me|deo me|me deo|me dẻo/, output: 'bt_deo_me'},
    { regex: /dẻo tôm|deo tom|tom deo|tôm dẻo/, output: 'bt_deo_tom'},
    { regex: /hộp muối|hop muoi|hu muoi|hủ muối|hu muối|muối tôm|muoi tom/, output: 'muoi_tom'},
    { regex: /muối chay|muoi chay|muoi ot/, output: 'muoi_chay'},
    { regex: /cha bong|chà bông|bt chà bông/, output: 'bt_cha_bong'},
    { regex: /kho ga|khô gà/, output: 'kho_ga'},
    { regex: /phơi sương|phoi suong|bánh tráng phơi sương|banh trang ps/, output: 'bt_phoi_suong'},
    { regex: /tròn muối ớt|tron muoi ot/, output: 'bt_tron_muoi_ot'},
    { regex: /chum ruot|chùm ruột|chum ruoc|chum ruột/, output: 'chum_ruot'},
    { regex: /mut me|mứt me|mức me|muc me/, output: 'mut_me'},
    { regex: /banh trang vuong|bánh tráng vuông/, output: 'bt_vuong'},
    { regex: /ống tôm|ong tom/, output: 'bt_ong_tom'},

    // Default for duplicated regex
    { regex: /tac|tắt|tat|tắc/, output: 'bt_sa_te_tac'},
    { regex: /sate|sa tế/, output: 'bt_sa_te_tac'},
  ]

  const result = testConditions.find(matchCondition(line.toLowerCase()))

  if (result) {
    return products[result.output]
  }

  return null;  
}

function detectQuantity(line) {
  const matches = line.match(/\d/g);
  return matches != null ? parseInt(matches.join('')) : 0;
}

function detectProductAndQuantity(line) {
  const product = detectProduct(line);
  const quantity = detectQuantity(line);

  return {
    product: product,
    quantity: quantity
  } 
}

function undetectedItem({ product }) {
  return !!product
}

function sentenceToItems(sentence) {
  return breakComma(breakSentence(sentence))
          .map(detectProductAndQuantity)
          .filter(undetectedItem)
}

function extractDescription(input) {
  return buildResponse(sentenceToItems(input))
}

// ----------------
// Main block
// ----------------
function main() {}
main();

module.exports = {
  itemLine,
  breakLine,
  sumLine,
  buildResponse,
  detectQuantity,
  detectProduct,
  sentenceToItems,
  extractDescription
};
