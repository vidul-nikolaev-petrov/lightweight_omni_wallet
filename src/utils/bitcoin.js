import bitcore from 'bitcore-lib';
import uuidV4 from 'uuid/v4';

export default {
    generateAddress(mouseMoves) {
        const bitcoin = random();
        const wif = bitcoin.toWIF();
        const address = bitcoin.toAddress().toString();

        return { wif, address };

        function random() {
            if (!mouseMoves) {
                throw new ReferenceError('mouseMoves is not defined');
            }

            var bitcoin, buffer, hash,
                moves = Array.from(new Array(16), () => 1),
                uuid = uuidV4().replace(/-/g, '').slice(0, 16);

            mouseMoves.forEach(list => {
                list.forEach((e, i) => {
                    moves[i] = Math.abs((e & 0xff) - moves[i]);
                });
            });

            moves = moves.map(e => e.toString(16)[0]);
            buffer = new Buffer(uuid + moves.join(''));
            hash = bitcore.crypto.Hash.sha256(buffer);
            bitcoin = bitcore.crypto.BN.fromBuffer(hash);

            console.log(mouseMoves.length, buffer.toString());

            return new bitcore.PrivateKey(bitcoin);
        }
    }
};