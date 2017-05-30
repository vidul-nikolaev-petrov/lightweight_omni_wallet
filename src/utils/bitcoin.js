import bitcoin from 'bitcoinjs-lib';
import uuidV4 from 'uuid/v4';

export default {
    generateAddress(mouseMoves) {
        const keyPair = bitcoin.ECPair.makeRandom({ rng });
        const address = keyPair.getAddress();
        const wif = keyPair.toWIF();

        function rng() {
            if (!mouseMoves) {
                throw new ReferenceError('mouseMoves is not defined');
            }

            var buffer,
                moves = Array.from(new Array(16), () => 1),
                uuid = uuidV4().replace(/-/g, '').slice(0, 16);

            mouseMoves.forEach(list => {
                list.forEach((e, i) => {
                    moves[i] = Math.abs((e & 0xff) - moves[i]);
                });
            });

            moves = moves.map(e => e.toString(16)[0]);
            buffer = bitcoin.crypto.sha256(uuid + moves.join(''));

            console.log(uuid, moves.join(''), mouseMoves.length, mouseMoves);

            return buffer;
        }
        
        return { wif: wif, address: address };
    }
};