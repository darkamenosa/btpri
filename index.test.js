const {
  extractDescription,
  itemLine,
  breakLine,
  sumLine,
  buildResponse,
  detectQuantity,
  detectProduct,
  sentenceToItems
} = require('./index');

describe('Test small function', () => {
  it('itemLine should be right', () => {
    const product = {
      name: 'Sa tế tắc',
      price: 6
    };

    const quantity = 30;

    expect(itemLine({ product, quantity })).toBe('Sa tế tắc: 30 * 6k = 180k\n');
  });

  it('breakLine should be right', () => {
    expect(breakLine()).toBe('____________________\n');
  });

  it('sumLine should be right', () => {
    expect(sumLine(410)).toBe('Tổng tiền hàng: 410k\n');
  });

  it('buildResponse should be right', () => {
    const input = [
      {
        product: {
          name: 'Sa tế tắc',
          price: 6
        },
        quantity: 30
      },
      {
        product: {
          name: 'Bơ',
          price: 10
        },
        quantity: 17
      },
      {
        product: {
          name: 'Me',
          price: 6
        },
        quantity: 10
      }
    ];

    // prettier-ignore
    const expectedOutput = '' 
      + 'Sa tế tắc: 30 * 6k = 180k\n'
      + 'Bơ: 17 * 10k = 170k\n'
      + 'Me: 10 * 6k = 60k\n' 
      + '____________________\n' 
      + 'Tổng tiền hàng: 410k\n';

    expect(buildResponse(input)).toEqual(expectedOutput);
  });

  it('detectQuantity should be right', () => {
    expect(detectQuantity('C cho e 30 tắc ')).toBe(30);
    expect(detectQuantity('17 bơ')).toBe(17);
    expect(detectQuantity('10 me nha c')).toBe(10);
    expect(detectQuantity('cho nha c')).toBe(0);
  });

  it('detectProduct should be right', () => {
    const bt_me = {
      name: 'Me',
      price: 6
    };

    expect(detectProduct('10 me nha c')).toEqual(bt_me);
    expect(detectProduct('me 10 nha c')).toEqual(bt_me);
  });

  it('sentenceToItems should pass oneline', () => {
    const sentence = 'C cho e 30 tắc , 17 bơ, 10 me nha c';

    const expectedOutput = [
      {
        product: {
          name: 'Sa tế tắc',
          price: 6
        },
        quantity: 30
      },
      {
        product: {
          name: 'Bơ',
          price: 10
        },
        quantity: 17
      },
      {
        product: {
          name: 'Me',
          price: 6
        },
        quantity: 10
      }
    ];

    expect(sentenceToItems(sentence)).toEqual(expectedOutput);
  });
});

describe('Test main function', () => {
  it('first sentence', () => {
    const input = 'C cho e 30 tắc , 17 bơ, 10 me nha c';

    // prettier-ignore
    const expectedOutput = '' 
      + 'Sa tế tắc: 30 * 6k = 180k\n'
      + 'Bơ: 17 * 10k = 170k\n'
      + 'Me: 10 * 6k = 60k\n' 
      + '____________________\n' 
      + 'Tổng tiền hàng: 410k\n';

    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('second sentence', () => {
    const input =
      'Lấy em 10 bánh trán me, 30 bánh trán trộn tắt, 30 bánh tráng sate tắt , 5 bánh tráng bơ';
    // prettier-ignore
    const expectedOutput = ''
      + 'Me: 10 * 6k = 60k\n'
      + 'Trộn tắc: 30 * 6k = 180k\n'
      + 'Sa tế tắc: 30 * 6k = 180k\n'
      + 'Bơ: 5 * 10k = 50k\n'
      + '____________________\n'
      + 'Tổng tiền hàng: 470k\n';
    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('third sentence', () => {
    // prettier-ignore
    const input = 'Em đặt\n'
                + '1 trộn tắc\n'
                + '10 sa tế tắc\n'
                + '14 me\n'
                + '10 bơ\n';

    // prettier-ignore
    const expectedOutput = ''
                + 'Trộn tắc: 1 * 6k = 6k\n'
                + 'Sa tế tắc: 10 * 6k = 60k\n'
                + 'Me: 14 * 6k = 84k\n'
                + 'Bơ: 10 * 10k = 100k\n'
                + '____________________\n'
                + 'Tổng tiền hàng: 250k\n';
    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('fourth sentence', () => {
    const input = 'Mai gởi cho c 40 sate ớt,20me 10muối 5 bơ 3kg khô gà nhé';

    // prettier-ignore
    const expectedOutput = ''
                + 'Sa tế tắc: 40 * 6k = 240k\n'
                + 'Me: 20 * 6k = 120k\n'
                + 'Bơ: 5 * 10k = 50k\n'
                + 'Khô gà: 3 * 230k = 690k\n'
                + '____________________\n'
                + 'Tổng tiền hàng: 1100k\n'
    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('fifth sentence', () => {
    const input = 'Mai lay e 200 ot tac 50me 50bo';

    // prettier-ignore
    const expectedOutput = ''
                + 'Sa tế tắc: 200 * 6k = 1200k\n'
                + 'Me: 50 * 6k = 300k\n'
                + 'Bơ: 50 * 10k = 500k\n'
                + '____________________\n'
                + 'Tổng tiền hàng: 2000k\n'
    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('sixth sentence', () => {
    // prettier-ignore
    const input = ''
                + 'Cho e đặt\n'
                + '20 sate tắc\n'
                + '20 me\n'
                + '10 tỏi sate\n'
                + '10 chà bông vuông\n'
                + '3 dẻo tôm\n'
                + '2 dẻo cay\n';

    // prettier-ignore
    const expectedOutput = ''
                + 'Sa tế tắc: 20 * 6k = 120k\n'
                + 'Me: 20 * 6k = 120k\n'
                + 'Sa tế tỏi: 10 * 6k = 60k\n'
                + 'Chà bông: 10 * 6k = 60k\n'
                + 'Dẻo tôm: 3 * 27k = 81k\n'
                + 'Dẻo cay: 2 * 25k = 50k\n'
                + '____________________\n'
                + 'Tổng tiền hàng: 491k\n'
    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('seventh sentence', () => {
    const input = 'Chị ơi lấy em 50b tắc trứơc em bán thử  nha';
    // prettier-ignore
    const expectedOutput = ''
                + 'Sa tế tắc: 50 * 6k = 300k\n'
                + '____________________\n'
                + 'Tổng tiền hàng: 300k\n'
    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('eighth sentence', () => {
    const input =
      '1 TÔM DẺO, 1 DẺO CAY, 5 BƠ, 15 ME, 5 SATE TẮC, 5 TỎI PHI SATE';
    // prettier-ignore
    const expectedOutput = ''
                + 'Dẻo tôm: 1 * 27k = 27k\n'
                + 'Dẻo cay: 1 * 25k = 25k\n'
                + 'Bơ: 5 * 10k = 50k\n'
                + 'Me: 15 * 6k = 90k\n'
                + 'Sa tế tắc: 5 * 6k = 30k\n'
                + 'Sa tế tỏi: 5 * 6k = 30k\n'
                + '____________________\n'
                + 'Tổng tiền hàng: 252k\n'

    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('nineth sentence', () => {
    // prettier-ignore
    const input = ''
                + '20 tắt  \n'
                + '15 me  \n'
                + '5 bơ \n'
                + '5 trộn tắc  \n'
                + '2 ống tôm \n'

    // prettier-ignore
    const expectedOutput = ''
                + 'Sa tế tắc: 20 * 6k = 120k\n'
                + 'Me: 15 * 6k = 90k\n'
                + 'Bơ: 5 * 10k = 50k\n'
                + 'Trộn tắc: 5 * 6k = 30k\n'
                + 'Ống tôm: 2 * 5k = 10k\n'
                + '____________________\n'
                + 'Tổng tiền hàng: 300k\n'
    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('tenth sentence', () => {
    // prettier-ignore
    const input = 'chị ơi mai chị sắp cho e 30 me 30 bơ 10 tắc nhé chị e gửi tiền cái là chị gửi bánh luôn cho em'
    const expectedOutput = ''
                + 'Me: 30 * 6k = 180k\n'
                + 'Bơ: 30 * 10k = 300k\n'
                + 'Sa tế tắc: 10 * 6k = 60k\n'
                + '____________________\n'
                + 'Tổng tiền hàng: 540k\n'
    expect(extractDescription(input)).toEqual(expectedOutput);
  });

  it('eleventh sentence', () => {
    // prettier-ignore
    const input = '30 bánh da tế tắc vs 1 hu muối'
    const expectedOutput = ''
                + 'Sa tế tắc: 30 * 6k = 180k\n'
                + 'Muối tôm: 1 * 80k = 80k\n'
                + '____________________\n'
                + 'Tổng tiền hàng: 260k\n'
    expect(extractDescription(input)).toEqual(expectedOutput);
  });
});
