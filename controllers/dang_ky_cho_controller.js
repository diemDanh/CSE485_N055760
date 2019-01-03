$(document).ready(function () {
    var MaSoDo='';
    var html='';
    var SoHang=9;
    var SoDo=[]; 
    var MaLop='';       
    function showClass(){ 
        html='';     
        var index=0;    
        SoDo.forEach(function(sl){    
            html+='<div class="cach"></div>';    
            for (let i = 0; i < sl; i++) {
                index++;       
                html+='<div id="day'+index+'" class="col">';
                for (let hang = 0; hang < SoHang; hang++) {
                    html+='<div id="day'+index+'-'+hang+
                        '" class="sv" ondrop="drop(event)" ondragover="allowDrop(event)"><div class="msv"></div><div class="name">'
                        +hang+'</div></div>';
                }
                html+='</div>';
            }        
        });
        html+='<div class="cach"></div>'; 
        $('#SDL').html(html);

        // $('#SDL div div').click(function (e) { 
        //     // alert($(e).attr("id"));
        //     console.log($(this).attr("id"));
        //     $(this).addClass('red');
        // }); 
        //drag drop
        function allowDrop(ev) {
            ev.preventDefault();
        }
        
        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }
        
        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
        }
        //nhap ma
        $('#MaSV').change(function (e) { 
            var MaSV=$('#MaSV').val();
            $.ajax({
                type: "GET",
                url: "../models/get_student.php",
                data: {MaSV:MaSV,MaLop:MaLop},
                dataType: "text",
                success: function (response) {
                    var jsonData=JSON.parse(response);
                    console.log(jsonData)
                    $('hr div .msv').html(response['MaSV']);
                    $('hr div .name').html(response['Ho']+' '+response['Ten']);
                },
                erro:function(){
                    $.toaster({ priority : 'danger', title : 'loi', message : 'xay ra loi'});
                },
            });            
        });
    
    }

    $('#MaLop').change(function (e) { 
        MaLop=$('#MaLop').val()
        $.ajax({
            type: "GET",
            url: "../models/get_class.php",
            data: {MaLop:MaLop},
            dataType: "text",
            success: function (data) {
                var jsonData=JSON.parse(data);
                console.log (jsonData);
                MaSoDo=jsonData['MaSoDo'];
                SoDo=Array.from(MaSoDo);
                SoHang=jsonData['SoHang'];
                showClass();
            },
            erro:function(){
                $.toaster({ priority : 'danger', title : 'loi', message : 'xay ra loi'});
            },
        });        
    });
    
});