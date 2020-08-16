/* 沙箱模式 */
(function(w){

    // 添加全局的 $.ajaxSetup 配值，除了首页以外的页面都要自动设置请求头
    $.ajaxSetup({
        // 在发送ajax之前，给所有的请求设置请求头
        beforeSend(xhr) {
            // 判断当前请求所在页面是否为登录页面
            if(location.href.indexOf('admin/login.html') === -1){
                // 读取token，设置请求头
                xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
            }
        },
        error(xhr, status, error){
            // console.log('xhr', xhr);
            // console.log('status', status);
            // console.log('error', error);
            // 判断错误信息是否为无权限
            if(error === 'Forbidden'){{
                alert('请先登录')
                window.location.href = './login.html'
            }}
        }
    })


    var baseURL = 'http://localhost:8080/api/v1'
    var BigNew = {
        baseURL:baseURL,//基地址
        user_login:      baseURL + '/admin/user/login',//用户登录
        user_info:       baseURL + '/admin/user/info',//用户信息
        user_detail:     baseURL + '/admin/user/detail',//用户详情
        user_edit:       baseURL + '/admin/user/edit',//用户编辑
        category_list:   baseURL + '/admin/category/list',//文章类别查询
        category_add:    baseURL + '/admin/category/add',//文章类别新增
        category_search: baseURL + '/admin/category/search',//文章类别搜索
        category_edit:   baseURL + '/admin/category/edit',//文章类别编辑
        category_delete: baseURL + '/admin/category/delete',//文章类别删除
        article_query:   baseURL + '/admin/article/query',//文章搜索
        article_publish: baseURL + '/admin/article/publish',//文章发布
        article_search:  baseURL + '/admin/article/search',//文章信息查询
        article_edit:    baseURL + '/admin/article/edit',//文章编辑
        article_delete:  baseURL + '/admin/article/delete',//文章删除
        comment_list:    baseURL + '/admin/comment/search',//文章评论列表
        comment_pass:    baseURL + '/admin/comment/pass',//文章评论通过
        comment_reject:  baseURL + '/admin/comment/reject',//文章评论不通过
        comment_delete:  baseURL + '/admin/comment/delete',//文章评论删除
        data_article: baseURL + '/admin/data/article',//日新增文章数量统计
    };

    //暴露接口
    w.BigNew = BigNew;
})(window);