export const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Solo el administrador puede realizar esta acción.' });
    }
    next();
};

export const userOnly = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Solo el usuario puede realizar esta acción.' });
    }
    next();
};

export const isUser = (req, res, next) => {
    if (req.user?.role !== 'user') {
      return res.status(403).json({ message: 'Solo los usuarios pueden modificar el carrito' });
    }
    next();
  };