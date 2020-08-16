$(function(){
    // 使用时间插件模板
        // 1.引入文件
        // 2.页面放置一个input框
        // 3.使用jeDate方法渲染，参数1：元素；参数2：配置项
        // 渲染时间插件模板
        jeDate('#testico', {
            // 触发操作
            triggle: 'click mouseenter',
            theme: { bgcolor: '#D91600', pnColor: 'orange' },
            format: 'YYYY-MM-DD',
            isinitVal: true
        })


        // 使用富文本插件
        tinymce.init({
            selector: '#mytextarea',
            language: 'zh_CN',
            directionality: 'ltr',
            browser_spellcheck: true,
            contextmenu: false,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste imagetools wordcount",
                "code"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",

        });

        // 请求文章类别
        // 5、所有文章类别
        // 请求地址：/admin/category/list
        // 请求方式：get
        // 请求参数：无
        // 返回数据：文章
        $.ajax({
            url: BigNew.category_list,
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if (res.code === 200) {
                    $('.category').html(template('categoryTemplate', res));
                }
            }
        })
})