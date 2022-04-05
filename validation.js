function Validation() {
    this.kiemTraRong = function (input, spanId, mess) {
        if (input === "") {
            getEle(spanId).innerHTML = mess;
            return false;
        }

        getEle(spanId).innerHTML = "";
        return true;
    };

    this.kiemTraTrungMaNhanVien = function (arr, input, spanId, mess) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].MaNV === input) {
                getEle(spanId).innerHTML = mess;
                return false;
            }
        }
        return true;
    };
}