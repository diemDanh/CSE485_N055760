// $(document).ready(function () {
//     var MaSoDo=''
//     var html='';
//     var SoHang=6;
//     var SoDo=[];
//     function showClass(SoDo){        
//         var index=0;    
//         SoDo.forEach(function(sl){    
//             html+='<div class="cach"></div>';    
//             for (let i = 0; i < sl; i++) {
//                 index++;       
//                 html+='<div id="day'+index+'" class="col">';
//                 for (let hang = 0; hang < SoHang; hang++) {
//                     html+='<div id="day'+index+'-'+hang+'" class="sv"><div class="msv"></div><div class="name">'+hang+'</div></div>';
//                 }
//                 html+='</div>';
//             }        
//         });
//         html+='<div class="cach"></div>'; 
//         $('#SDL').html(html);

//         $('#SDL div div').click(function (e) { 
//             // alert($(e).attr("id"));
//             console.log($(this).attr("id"));
//             $(this).addClass('red');
//         });

//         $('#taoSoDo').click(function (e) { 
//             $.ajax({
//                 type: "POST",
//                 url: "../models/taoSoDo.php",
//                 data: {MaSoDo:MaSoDo,SoHang:SoHang,Code:html},
//                 dataType: "html",
//                 success: function (data) {
//                     if(data=='thanh cong')$.toaster({ priority : 'success', title : 'success', message : data});
//                     else $.toaster({ priority : 'warning', title : 'warning', message :data});

//                 },
//                 erro:function(){
//                     $.toaster({ priority : 'danger', title : 'loi', message : 'xay ra loi'});
//                 },           
//             });      
//         });
//     }
// });
$(document).ready(function () {

    var MaSoDo = '';
    var html = '';
    var SoHang = 9;
    var SoDo = [];
    var MaLop = '';
    function showClass() {
        html = '';
        var index = 0;
        SoDo.forEach(function (sl) {
            html += '<div class="cach"></div>';
            for (let i = 0; i < sl; i++) {
                index++;
                html += '<div id="day' + index + '" class="col">';
                for (let hang = 0; hang < SoHang; hang++) {
                    html += '<div id="day' + index + '-' + hang +
                        '" class="sv" ondrop="drop(event)" ondragover="allowDrop(event)"></div>';
                }
                html += '</div>';
            }
        });
        html += '<div class="cach"></div>';
        $('#SDL').html(html);

        $('#SDL div div').click(function (e) {
            // alert($(e).attr("id"));
            console.log($(this).attr("id"));
            $(this).addClass('red');
        });

        //nhap ma
        $.ajax({
            type: "GET",
            url: "../models/get_student.php",
            data: { MaLop: MaLop },
            dataType: "text",
            success: function (response) {

                response=response.replace(/}{/g,'},{');
                // console.log(response);
                var jsonData = JSON.parse(response);
                console.log(jsonData);
                for (var row in jsonData) {
                    $('#'+jsonData[row]['MaViTri']).html(jsonData[row]['Ho']+' '+jsonData[row]['Ten']);
                    // console.log (jsonData[row]['MaViTri']);
                }
            }
        });
    }


    $('#MaLop').change(function (e) {
        MaLop = $('#MaLop').val()
        $.ajax({
            type: "GET",
            url: "../models/get_class.php",
            data: { MaLop: MaLop },
            dataType: "text",
            success: function (data) {
                var jsonData = JSON.parse(data);
                console.log(jsonData);
                MaSoDo = jsonData['MaSoDo'];
                SoDo = Array.from(MaSoDo);
                SoHang = jsonData['SoHang'];
                showClass();
            },
            erro: function () {
                $.toaster({ priority: 'danger', title: 'loi', message: 'xay ra loi' });
            },
        });
    });

});