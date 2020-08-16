$(function () {

    function init() {
        // 通过引入common.js文件解决
        // 初始化类别数据
        // 使用时间插件模板
        // 使用富文本插件

        // 处理图片回显事件
        $('#inputCover').on('change', function () {
            // 拿到文件对象
            const myfile = $(this)[0].files[0];
            // 得到文件对应的内存的url
            const url = URL.createObjectURL(myfile);
            // 将url赋值给img标签
            $('.article_cover').attr('src', url);
        })

    }
    init()

    // 点击发布按钮事件
    $('.btn-release').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault();
        articlePublish('已发布');
    })

    // 点击发布或者存为草稿，发起请求
    // 11、发布文章
    // 请求地址：/admin/article/publish
    // 请求方式：post
    // 请求参数：通过`formData`提交
    function articlePublish(state) {
        let formdata = new FormData($('#form')[0]);
        formdata.append('content', tinymce.activeEditor.getContent());
        formdata.append('state', state);
        console.dir(...formdata);
        $.ajax({
            type: 'post',
            url: BigNew.article_publish,
            data: formdata,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: (res)=>{
                if(res.code === 200){
                    alert(res.msg);
                    // window.location.href = './article_list.html';
                    $('#article_list', parent.document)[0].click();
                }
            },
            error: (err)=>{
                console.log(err);
            }
        })
    }
})