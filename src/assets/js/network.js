$(document).ready(function () {

    let addrScript = 'https://script.google.com/macros/s/AKfycbzhTsGcsyN8kUTHMm1RxTwnCKApGBWuTu1wBnxTjZ7lW4vSMpWQ_Ey5Ve9wqgZVLep7/exec';

    // $.ajax({
    //     url: addrScript+'?action=insert&table=visitor&data='+data,
    //     dataType: 'jsonp',
    //     success: function (data) {
    //     console.log('성공 - ', JSON.stringify(data));
    //     },
    //     error: function (xhr) {
    //     console.log('실패 - ', JSON.stringify(xhr));
    //     }
    // });


    connect(addrScript)
});

    function connect(addrScript) {
        axios.get(addrScript+'?action=insert&table=visitor&data='+data)
        .then(response => {
            console.log(JSON.stringify(response));
        })
        .catch(error => {
            if (error.response) {
                // 서버가 2xx 범위를 벗어난 상태 코드로 응답한 경우
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // 요청이 전송되었지만 응답을 받지 못한 경우
                console.log(error.request);
            } else {
                // 요청 설정 중에 오류가 발생한 경우
                console.log('Error', error.message);
            }
            console.log(error.config);
        });
    }

    // Sam pading value to start with 0. eg: 01, 02, .. 09, 10, ..
    function padValue(value) {
        return (value < 10) ? "0" + value : value;
    }

    function getTimeStamp() {
        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        const formattedDate = `${padValue(year)}-${padValue(month)}-${padValue(day)} ${padValue(hours)}:${padValue(minutes)}:${padValue(seconds)}`;

        return formattedDate;
    }

    var queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const utm = urlParams.get("utm")
    var mobile = 'desktop';
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        mobile = 'mobile';
    }

    // 쿠키에서 값을 가져오는 함수
    function getCookieValue(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) {
            return parts.pop().split(";").shift();
        }
    }

    // 쿠키에 값을 저장하는 함수
    function setCookieValue(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function getUVfromCookie() {
        // 6자리 임의의 문자열 생성
        const hash = Math.random().toString(36).substring(2, 8).toUpperCase();
        // 쿠키에서 기존 해시 값을 가져옴
        const existingHash = getCookieValue("user");
        // 기존 해시 값이 없으면, 새로운 해시 값을 쿠키에 저장
        if (!existingHash) {
            setCookieValue("user", hash, 180); // 쿠키 만료일은 6개월
            return hash;
        } else {
            // 기존 해시 값이 있으면, 기존 값을 반환
            return existingHash;
        }
    }

    /* data를 만들 땐 모든 field가 들어 있어야 함 */
    var data = JSON.stringify(
        {"id": getUVfromCookie(),
            "landingUrl":window.location.href,
            "ip":ip,
            "referer":document.referrer,
            "time_stamp":getTimeStamp(),
            "utm":utm,
            "device":mobile}
    );

    $("#submit").on("click", function () {

        const email = $("#submit-email").val();
        const advice = $("#submit-advice").val();

        function validateEmail(email) {
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            return re.test(email);
        }

        if (email == '' || !validateEmail(email)) {
            alert("이메일이 유효하지 않아 알림을 드릴 수가 없습니다. ");
            return;
        }

        var finalData = JSON.stringify({
            "id": getUVfromCookie(),
            "email": email,
            "advice": advice
        })

        axios.get(addrScript + '?action=insert&table=advice&data=' + finalData)
            .then(response => {
                // console.log(response.data.data);
                // alert(JSON.stringify(response));
                alert('소중한 의견 감사합니다. 축복 받으실 겁니다.')
                location.reload()
            }).finally(function () {
                $('#submit-email').val('');
                $('#submit-advice').val('');
            });

    });