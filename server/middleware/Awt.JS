const Client = require('../modals/signup');
const jwt = require('jsonwebtoken');

// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, 'ghvghghvg', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Token is not valid' });
//     }
//     req.user =  await Client.findById(decoded.id).select("-password");
//     // req.user = decoded;
//     // console.log(decoded);
//     next();
//   });
// };

// module.exports = verifyToken;
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'ghvghghvg');

    // Retrieve user from the database
    req.user = decoded
    // req.user = await Client.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = verifyToken;
