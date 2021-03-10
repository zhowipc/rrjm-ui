import menusApi from "@/api/menus";
export const initMenus = (router, store) => {
    if (store.state.routes.length > 0) return;
    menusApi.initMenus().then(data => {
        // 格式化router
        let fmtRoutes = formatRoutes(data.obj);
        // 添加到router
        router.addRoutes(fmtRoutes);
        store.commit("INIT_ROUTES", fmtRoutes);
    });
};
export const formatRoutes = routes => {
    let fmtRoutes = [];
    routes.forEach(router => {
        let { path, component, name, icon, children } = router;
        if (children && children instanceof Array) {
            children = formatRoutes(children);
        }
        let fmtRouter = {
            path: path,
            name: name,
            icon: icon,
            children: children,
            component(resolve) {
                // console.log("-----------resolve:" + resolve);
                require(["../views/" + component + '.vue'], resolve)
            }
        };
        fmtRoutes.push(fmtRouter);
    });
    return fmtRoutes;
};