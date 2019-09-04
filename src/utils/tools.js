export function showDialog(title, content) {
  layui.use('layer', function(){
    var layer = layui.layer;

    layer.open({
      title: title
      ,content: content
    });
  });
}
