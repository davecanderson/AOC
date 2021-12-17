let aoc = require('./AOC-2021.js');

let solver = new aoc.Solver('16', '2021');

solver.testData.P1 = { input: "", answer: "" };
solver.testData.P2 = { input: "", answer: "" };

const getPacket = (input) => {

  let version = parseInt(input.substring(0,3), 2);
  let type = parseInt(input.substring(3,6), 2);
  let length = 6;
  let literal = '';
  let packets = [];

  switch(type) {
    case 4:
      let bits = input.substring(6).match(/((?:1[10]{4})*(?:0[10]{4})?|0*)/)[0];
      length += bits.length;
      while(bits.length) {
        literal += bits.substring(1,5);
        bits = bits.substring(5);
      }
      literal = parseInt(literal,2);
      break;
    default:
      let lengthType = parseInt(input.charAt(6));
      length += 1;
      if(lengthType) {
        let packetCount = parseInt(input.substring(7, 18),2);
        input = input.substring(18);
        length += 11;
        while(packetCount > packets.length) {
          let packet = getPacket(input);
          packets.push(packet);
          input = input.substring(packet.length);
        }
      } else {
        let bitCount = parseInt(input.substring(7, 22),2);
        input = input.substring(22, bitCount + 22);
        length += 15;
        while(bitCount > 0) {
          let packet = getPacket(input);
          packets.push(packet);
          bitCount -= packet.length;
          input = input.substring(packet.length);
        }
      }
      break;
  }

  let packet = {
    version,
    type,
    packets,
    length: length + packets.reduce((a,c) => a += c.length,0),
    versionSum: version + packets.reduce((a,c) => a += c.versionSum,0),
    value: () => {
      switch(type) {
        case 0: return packets.reduce((a,c) => a += c.value(),0);
        case 1: return packets.reduce((a,c) => a = a * c.value(),1);
        case 2: return packets.reduce((a,c) => a = Math.min(a,c.value()),Infinity);
        case 3: return packets.reduce((a,c) => a = Math.max(a,c.value()),0);
        case 4: return literal;
        case 5: return packets[0].value() > packets[1].value() ? 1 : 0;
        case 6: return packets[0].value() < packets[1].value() ? 1 : 0;
        case 7: return packets[0].value() === packets[1].value() ? 1 : 0;
      }
    }
  }

  return packet;
}

solver.parseInput = function (input) {
  return input.split('').map((c) => parseInt(c,16).toString(2).padStart(4,'0')).join('');
};

solver.solvePart1 = function (data) {

  let packetTest1 = getPacket(solver.parseInput('D2FE28'));
    
  console.assert(packetTest1.type === 4, `D2FE28 type ${packetTest1.type} not 4`);
  console.assert(packetTest1.value() === 2021, `D2FE28 ${packetTest1.type} not 2021`);

  let packetTest2 = getPacket(solver.parseInput('38006F45291200'));

  console.assert(packetTest2.version === 1, `38006F45291200 version ${packetTest2.version} not 1`);
  console.assert(packetTest2.type === 6, `38006F45291200 type ${packetTest2.type} not 6`);
  console.assert(packetTest2.packets.length === 2, `38006F45291200 packets ${packetTest2.packets.value()} not 2`);
  console.assert(packetTest2.packets[0].value() === 10, `38006F45291200 packet 1 ${packetTest2.packets.length} not 10`);
  console.assert(packetTest2.packets[1].value() === 20, `38006F45291200 packet 2 ${packetTest2.packets.length} not 20`);

  let packetTest3 = getPacket(solver.parseInput('EE00D40C823060'));

  console.assert(packetTest3.packets.length === 3, `EE00D40C823060 packets ${packetTest3.packets.length} not 3`);
  console.assert(packetTest3.packets[0].value() === 1, `EE00D40C823060 packet 1 ${packetTest3.packets[0].value()} not 1`);
  console.assert(packetTest3.packets[1].value() === 2, `EE00D40C823060 packet 2 ${packetTest3.packets[1].value()} not 2`);
  console.assert(packetTest3.packets[2].value() === 3, `EE00D40C823060 packet 3 ${packetTest3.packets[2].value()} not 3`);

  let packetTest4 = getPacket(solver.parseInput('8A004A801A8002F478'));

  console.assert(packetTest4.versionSum === 16,`8A004A801A8002F478 version sum ${packetTest4.versionSum} not 16`);

  let packetTest5 = getPacket(solver.parseInput('620080001611562C8802118E34'));
  
  console.assert(packetTest5.versionSum === 12,`620080001611562C8802118E34 version sum ${packetTest5.versionSum} not 12`);

  let packetTest6 = getPacket(solver.parseInput('C0015000016115A2E0802F182340'));
  
  console.assert(packetTest6.versionSum === 23,`C0015000016115A2E0802F182340 version sum ${packetTest6.versionSum} not 23`);

  let packetTest7 = getPacket(solver.parseInput('A0016C880162017C3686B18A3D4780'));
  
  console.assert(packetTest7.versionSum === 31,`A0016C880162017C3686B18A3D4780 version sum ${packetTest7.versionSum} not 31`);

  let packet = getPacket(data);

  return packet.versionSum;
};

solver.solvePart2 = function (data) {

  let packetTest1 = getPacket(solver.parseInput('C200B40A82'));
  console.assert(packetTest1.value() === 3, `C200B40A82 ${packetTest1.value()} not 3`);

  let packetTest2 = getPacket(solver.parseInput('04005AC33890'));
  console.assert(packetTest2.value() === 54, `04005AC33890 ${packetTest2.value()} not 54`);

  let packetTest3 = getPacket(solver.parseInput('880086C3E88112'));
  console.assert(packetTest3.value() === 7, `880086C3E88112 ${packetTest3.value()} not 7`);

  let packetTest4 = getPacket(solver.parseInput('CE00C43D881120'));
  console.assert(packetTest4.value() === 9, `CE00C43D881120 ${packetTest4.value()} not 9`);

  let packetTest5 = getPacket(solver.parseInput('D8005AC2A8F0'));
  console.assert(packetTest5.value() === 1, `D8005AC2A8F0 ${packetTest5.value()} not 1`);

  let packetTest6 = getPacket(solver.parseInput('F600BC2D8F'));
  console.assert(packetTest6.value() === 0, `F600BC2D8F ${packetTest6.value()} not 0`);

  let packetTest7 = getPacket(solver.parseInput('9C005AC2F8F0'));
  console.assert(packetTest7.value() === 0, `9C005AC2F8F0 ${packetTest7.value()} not 0`);

  let packetTest8 = getPacket(solver.parseInput('9C0141080250320F1802104A08'));
  console.assert(packetTest8.value() === 1, `9C0141080250320F1802104A08 ${packetTest8.value()} not 1`);
  
  return getPacket(data).value();
};

aoc.run(solver);