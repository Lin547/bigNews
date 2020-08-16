$(function () {
    // 子页面中拿到父页面中的元素
    // console.log($("#article_release", parent.document))

    // 拿到页面传递过来的id值
    const id = location.search.split('=')[1];
    function init() {

        // 通过引入common.js文件解决
        // 使用时间插件模板
        // 使用富文本插件
        // 请求文章类别


        // console.log(id);
        // 12、根据id获取文章信息
        // 请求地址：/admin/article / search
        // 请求方式：get
        // 请求参数：id
        $.ajax({
            url: BigNew.article_search,
            data: { id },
            dataType: 'json',
            success: (res) => {
                console.log(res);
                if (res.code === 200) {
                    $('#inputTitle').val(res.data.title);
                    $('.article_cover').attr('src', res.data.cover);
                    $('.category').val(res.data.categoryId);
                    $('#testico').val(res.data.date);
                    $('#mytextarea').html(res.data.content);
                }
            }
        })


    }

    init();

    // 图片回显处理
    $('#inputCover').on('change', function () {
        // 1.拿到文件对象
        const myfile = $(this)[0].files[0];
        // 2.转换文件对象，拿到内存中的url地址
        const url = URL.createObjectURL(myfile);
        // 3.将url赋值给img标签，显示图片
        $('.article_cover').attr('src', url);
    })

    // 点击修改事件
    $('.btn-edit').on('click', function (e) {
        e.preventDefault();
        editArticle('已发布');
    })

    $('.btn-draft').on('click', function (e) {
        e.preventDefault();
        editArticle('草稿');
    })

    function editArticle(state) {
        const formdata = new FormData($('#form')[0]);
        formdata.append('content', tinymce.activeEditor.getContent());
        formdata.append('state', state);
        formdata.append('id', id);
        $.ajax({
            type: 'post',
            url: BigNew.article_edit,
            data: formdata,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: (res) => {
                if (res.code === 200) {
                    alert(res.msg);
                    // window.history.back();
                    window.location.href = './article_list.html';
                }
            }
        })
    }

})