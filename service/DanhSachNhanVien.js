function NhanVienService(){

    this.arr = [];

    this.layDanhSachNhanVienService = function(){
        /**
         * Axios trả về đối tượng Promise (ES6): có 3 trạng thái
         * - pending: thời gian chờ
         * - resolve: thành công (then)
         * - reject: thất bại (catch)
         */
        return axios({
            url: "https://60443165a20ace001728eb92.mockapi.io/api/QLNV",
            method: "GET",
        });

    };

    this.xoaNhanVienService = function(id){
        return axios({
            url:  `https://60443165a20ace001728eb92.mockapi.io/api/QLNV/${id}`,
            method: "DELETE",
        });
    };

    this.themNhanVienService = function(user){
        return axios({
            url: "https://60443165a20ace001728eb92.mockapi.io/api/QLNV",
            method: "POST",
            data: user
        });
    };

    this.layThongTinChiTietService = function(id){
        return axios({
            url:`https://60443165a20ace001728eb92.mockapi.io/api/QLNV/${id}`,
            method: "GET",
        });
    };

    this.capNhatNhanVienService = function(user){
        return axios({
            url: `https://60443165a20ace001728eb92.mockapi.io/api/QLNV/${user.id}`,
            method: "PUT",
            data: user
        });
    };

    NhanVienService.prototype.timKiemNhanVien = function(keyword){
        /**
         * 0.Tao bien mangTimKiem = []
         * 1.Duyet mang this.arr
         * 2.Neu keyword trung voi thuoc tinh tenSV cua tung phan tu duyet qua this.arr => sinh vien tim thay them vao mangTimKiem
         * 3.Tra ve mangTimKiem
         */
      
        var mangTimKiem = [];
        for (var i = 0; i < this.arr.length; i++) {
          if (this.arr[i].TenNV.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) { //toLowerCase -> chu in hoa => chu thuong, neu muon in hoa thi chuyen lower -> upper
            mangTimKiem.push(this.arr[i]);
          }
        }
        return mangTimKiem;
      };

};