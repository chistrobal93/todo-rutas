export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('messageWarning','No tiene permiso para visualizar esta página');
    return res.redirect('/');
}

export function isntLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    req.flash('messageWarning','Ya ha iniciado sesión');
    return res.redirect('back');
}