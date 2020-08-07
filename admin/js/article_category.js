$(function () {

    // 加载类别数据
    // 5、所有文章类别
    // 请求地址：/admin/category / list
    // 请求方式：get
    // 请求参数：无
    // 返回数据：文章
    function init() {
        $.ajax({
            url: BigNew.category_list,
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.code === 200) {
                    // 模板渲染，并追加到表格中
                    $('tbody').html(template('categoryTemplate', res))
                }
            }
        })
    }
    init();

    // 点击新增按钮，修改模态框信息
    $('#xinzengfenlei').on('click', function () {
        $('.btn-primary').text('新增');
    })

    // 给模态框的确认按钮注册事件
    //  6、新增文章类别
    // 请求地址：/admin/category/add
    // 请求方式：post
    // 请求参数：
    $('.btn-primary').on('click', function () {
        if ($(this).text() == '新增') {
            const data = $('form').serialize();
            opt(data, BigNew.category_add, '新增');
        } else if ($(this).text() == '编辑') {
            const data = $('form').serialize();
            opt(data, BigNew.category_edit, '编辑');
        }
    })
    // 新增和编辑的Ajax请求封装
    // 参数：data 传递的数据   url 访问的地址  msg 按钮上的文字
    function opt(data, url, msg) {
        $.ajax({
            type: 'post',
            url: url,
            data: data,
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.code === 201 || res.code === 200) {
                    $('#myModal').modal('hide');
                    init();
                    alert(msg + '操作成功');
                }
            },
            error: (err) => {
                // console.log(err);
                if (err.responseJSON.code === 400) {
                    alert(err.responseJSON.msg)
                    $('#myModal').modal('hide')
                }
            }
        })
    }

    //点击编辑按钮，将当前数据放到模态框中展示，并修改模态框为编辑模态框
    // 7、根据id查询指定文章类别
    // 请求地址：/admin/category/search
    // 请求方式：get
    // 请求参数：id
    $('tbody').on('click', '.btn_edit', function () {
        $('.btn-primary').text('编辑');
        const id = $(this).attr('data-id');
        $.ajax({
            url: BigNew.category_search,
            data: { id },
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res.code === 200) {
                    // console.log(res.data[0].name);
                    $('#myModal').modal('show');
                    $('#name').val(res.data[0].name);
                    $('#slug').val(res.data[0].slug);
                    $('#categoryId').val(res.data[0].id);
                }
            }
        })
    })

    // 点击删除按钮，将对应的数据删除
    // 9、删除文章类别
    // 请求地址：/admin/category/delete
    // 请求方式：post
    // 请求参数：
    $('tbody').on('click', '.btn_delete', function () {
        const id = $(this).data('id');
        if (confirm('确定要删除吗?')) {
            $.ajax({
                type: 'post',
                url: BigNew.category_delete,
                data: { id },
                success: (res) => {
                    if(res.code === 204){
                        init();
                    }
                },
                error: (err) => {
                    console.log(err);
                }
            })
        }

    })

    // 模态框关闭所做的处理
    $('#myModal').on('shown.bs.modal', function () {
        $('form')[0].reset();
    })

})