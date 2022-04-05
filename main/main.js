var service = new NhanVienService();
var model = new NhanVien();
var validation = new Validation();

layDanhSachNhanVien();

function layDanhSachNhanVien() {
    getEle("loader").style.display = "block";
    service.layDanhSachNhanVienService()
        .then(function (result) {
            console.log(result.data);
            getEle("loader").style.display = "none";
            taoBang(result.data);
        })
        .catch(function (err) {
            console.log(err);
        });
    
}

// function layGiaTriNhanVien(isAdd) {

//     var _MaNV = getEle("msnv").value;
//     var _TenNV = getEle("name").value;
//     var _Email = getEle("email").value;
//     var _MatKhau = getEle("password").value;
//     var _NgaySinh = getEle("datepicker").value;
//     var _ChucVu = getEle("chucvu").value;

//     var isValid = true;

//     if (isAdd) {
//         isValid &= validation.kiemTraRong(_MaNV, "spanMaNV", "(*) Vui lòng nhập mã nhân viên");
//         isValid &= validation.kiemTraRong(_TenNV, "spanHoTen", "(*) Vui lòng nhập họ tên nhân viên") &&
//             validation.kiemTraChuoi(_TenNV, "spanHoTen", "(*) Chỉ cho nhập chữ") &&
//             validation.kiemTraDoDaiKyTu(_TenNV, "spanHoTen", "(*) Độ dài ký tự trong khoảng 4-10 ký tự");
//     }

//     if (isValid) {
//         var nhanVien = new NhanVien(
//             _MaNV,
//             _TenNV,
//             _Email,
//             _MatKhau,
//             _NgaySinh,
//             _ChucVu
//         );
//         return nhanVien;
//     }
//     return null;

// }

function taoBang(arr) {
    var content = "";
    for (var i = 0; i < arr.length; i++) {
        content += `
            <tr>

                <td>${arr[i].MaNV}</td>
                <td>${arr[i].TenNV}</td>
                <td>${arr[i].Email}</td>
                <td>${arr[i].NgaySinh}</td>
                <td>${arr[i].ChucVu}</td>
                
                <td>
                    <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien(${arr[i].id})">Sửa</button>
                    <button class="btn btn-danger" onclick="xoaNhanVien(${arr[i].id})">Xóa</button>
                </td>

            </tr>
        `;
    }
    getEle("tableDanhSach").innerHTML = content;
}

function xoaNhanVien(id) {
    service.xoaNhanVienService(id)
        .then(function () {
            alert("Delete success");
            layDanhSachNhanVien();
        })
        .catch(function (err) {
            console.log(err);
        });
}

getEle("btnThem").addEventListener("click", function(isAdd){

    document.getElementById('msnv').value = "";
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
    document.getElementById('datepicker').value = "";
    document.getElementById('chucvu').value = "";
    //Tao nut them user
    var footer = `
        <button id="btnThemNV" type="button" class="btn btn-success" onclick="themNhanVien();">Thêm người dùng</button>
        <button id="btnDong" type="button" class="btn btn-danger-close" data-dismiss="modal">Đóng</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function themNhanVien() {

    var _MaNV = getEle("msnv").value;
    var _TenNV = getEle("name").value;
    var _Email = getEle("email").value;
    var _MatKhau = getEle("password").value;
    var _NgaySinh = getEle("datepicker").value;
    var _ChucVu = getEle("chucvu").value;

    var user = new NhanVien(
        "",
        _MaNV,
        _TenNV,
        _Email,
        _MatKhau,
        _NgaySinh,
        _ChucVu
    );

    service.themNhanVienService(user)
        .then(function (result) {
            alert("Add success");
            document.getElementsByClassName("btn btn-danger-close")[0].click();
            document.getElementById('msnv').value = "";
            document.getElementById('name').value = "";
            document.getElementById('email').value = "";
            document.getElementById('password').value = "";
            document.getElementById('datepicker').value = "";
            document.getElementById('chucvu').value = "";
            layDanhSachNhanVien();
        })
        .catch(function (err) {
            console.log(err);
        });
}

function suaNhanVien(id) {

    var footer = `
    <button id="btnCapNhat" type="button" class="btn btn-success" onclick="capNhat(${id});">Cập nhật</button>
    <button id="btnDong" type="button" class="btn btn-danger-close" data-dismiss="modal">Đóng</button>
    `;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    service.layThongTinChiTietService(id)
        .then(function (result) {
            getEle("msnv").value = result.data.MaNV;
            getEle("name").value = result.data.TenNV;
            getEle("password").value = result.data.MatKhau;
            getEle("email").value = result.data.Email;
            getEle("datepicker").value = result.data.NgaySinh;
            getEle("chucvu").value = result.data.ChucVu;

        })
        .catch(function (err) {
            console.log(err);
        });
}

function capNhat(_id) {

    var _MaNV = getEle("msnv").value;
    var _TenNV = getEle("name").value;
    var _Email = getEle("email").value;
    var _MatKhau = getEle("password").value;
    var _NgaySinh = getEle("datepicker").value;
    var _ChucVu = getEle("chucvu").value;

    var user = new NhanVien(
        _id,
        _MaNV,
        _TenNV,
        _Email,
        _MatKhau,
        _NgaySinh,
        _ChucVu
    );

    service.capNhatNhanVienService(user)
        .then(function () {
            alert("Edit success");
            document.getElementsByClassName("btn btn-danger-close")[0].click();
            layDanhSachNhanVien();
        })
        .catch(function (err) {
            console.log(err);
        });
}

/**
 * Tìm Kiếm
 */

 getEle("searchName").addEventListener("keyup", function () {
    var keyWord = getEle("searchName").value;
    var mangTimKiem = service.timKiemNhanVien(keyWord);
    taoBang(mangTimKiem);
  });

function getEle(id) {
    return document.getElementById(id);
}