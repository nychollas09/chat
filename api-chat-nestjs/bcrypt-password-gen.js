const bcrypt = require('bcrypt');

console.log(bcrypt.hashSync('123', 10));

console.log(
  bcrypt.compareSync(
    '123',
    '$2b$10$WBGbhP0p9drHi2s7DmDu0.jxq1QcdkWRHYC3E3HLP7Tx4dhigLGOG',
  ),
);
