//let api_base_url = "http://127.0.0.1:8000";
let api_base_url = "https://www.gpa5reception.com";

/*$(window).on('load', function () {
    $('#loading').hide();
});*/
setTimeout(() => {
    $('#loading').hide();
}, 1000)


var swiper1 = new Swiper(".mySwiper", {
    spaceBetween: 30, centeredSlides: true, loop: true, autoplay: {
        delay: 2500, disableOnInteraction: false,
    }, navigation: {
        nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev",
    }, pagination: {
        el: '.swiper-pagination', clickable: true,
    }
});


const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal', spaceBetween: 1, centeredSlides: true, loop: true, autoplay: {
        delay: 2500, disableOnInteraction: false,
    }, // If we need pagination
    pagination: {
        el: '.swiper-pagination', clickable: true,
    }, // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
   scrollbar: {
        el: document.querySelector('.swiper-scrollbar') ? '.swiper-scrollbar' : "",
    },
});

const swiperVideo = new Swiper('.swiper-video', {
    // Optional parameters
    direction: 'horizontal', spaceBetween: 10,  slidesPerView: 2, loop: true, autoplay: {
        delay: 2500, disableOnInteraction: false,
    },
    breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 2,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 2,
        }
      }
});


$('.information-box').css('display', 'none');
$("path").mouseleave(function (e) {
    $('.information-box').css('display', 'none');
});

$(document).mousemove(function (e) {
    $('.information-box').css('top', e.pageY - $('.information-box').height() - 30);

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        $('.information-box').css('top', e.pageY - $('.information-box').height() - 30);
        $('.information-box').css('left', e.pageX - ($('.information-box').width()) / 2);
    } else {
        $('.information-box').css('left', e.pageX - (($('.information-box').width()) / 2) - 250);
    }


}).mouseover();


var app = angular.module('shikhoApp', []);
app.controller('registrationController', function ($scope, $http) {
    $scope.board = "1";
    $scope.timers = "";
    $scope.boardChange = function () {
        let url = api_base_url + '/api/board-data/' + $scope.board;
        ////console.log(url);
        $http.post(url, {
            msg: 'hello word!'
        }).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.board_gpa = response.data.board.gpa_five;
            $scope.board_name = response.data.board.board_name;
            $scope.total_passed = response.data.total_passed;

            /////console.log($scope.total_registration)
        }, function (response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            ////console.log(response);
        });
    }

    $scope.event_district_list = [];
    $scope.eventDivisionChange = function () {

        $('#loading').show();
        let url = api_base_url + "/api/district-list/" + $scope.event_division;
        //console.log(url);
        $http.post(url, {}).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            ////console.log(response.data);
            $('#loading').hide();
            $scope.event_district_list = response.data;

        }, function (response) {
            $('#loading').hide();
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            ////console.log(response);
        });
    }

    $scope.hoverIn = function (id) {
        $('.information-box').css('display', 'block');
        //$scope.gpa = id;
        // ////console.log(id);
        $scope.educationBoard(id);


    };
    $scope.hoverOut = function (id) {
        $('.information-box').css('display', 'none');
    };


    $scope.educationBoard = function (id) {

        $('.information-box').css('display', 'block');

        //console.log(id);


        //$('#loading').show();
        $scope.board = id;
        let url = api_base_url + '/api/board-data/' + $scope.board;
        ////console.log(url);
        $http.post(url, {
            msg: 'hello word!'
        }).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            //console.log(response.data);
            $scope.board_gpa = response.data.board.gpa_five;
            $scope.board_name = response.data.board.board_name;
            $scope.total_passed = response.data.board.total_passed;
            // $('#loading').hide();
        }, function (response) {
            //$('#loading').hide();
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            ////console.log(response);
        });


    };

    /*Pixel Start*/
    fbq('track', 'Registration Start', {            
        EventName: 'Registration Start',
        EventTime: new Date().toISOString(),
        ClientUserAgent: navigator.userAgent,
        EventSourceURL: window.location.href,
    });
    /*Pixel End*/

    let number_one = Math.floor(Math.random() * 9);
    let number_two = Math.floor(Math.random() * 9);
    $scope.progressbar = 0;
    $scope.board = "";
    $scope.examination = "এসএসসি";
    $scope.year = "২০২৩";
    $scope.district = "";
    $scope.phone = "";
    $scope.otp = "";
    $scope.registration = "";
    $scope.roll = "";
    $scope.event_division = "";
    $scope.event_district = "";
    // open after registration
    //document.getElementById("stepPassword").style.display = "none";
    $scope.step1 = true;
    $scope.step2 = false;
    $scope.stepPassword = false;
    $scope.step3 = false;
    $scope.stepOtp = false;
    $scope.stepVenue = false;
    $scope.sentotp = false;
    $scope.loading = false;
    $scope.save = true;

    $scope.startTimer = function (duration, type) {
        document.getElementById("timer").style.display = "block";
        document.getElementById("resendOtp").style.display = "none";
        var timer = duration, minutes, seconds;
        var handle = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;


            document.getElementById("timer").innerHTML = minutes + ":" + seconds;


            if (--timer < 0) {
                //timer = duration;

                if (type == 'otp') {
                    ////console.log("hidddd")
                    document.getElementById("timer").style.display = "none";
                    document.getElementById("resendOtp").style.display = "block";
                    clearInterval(handle);
                }
            }

        }, 1000);
    }


    $scope.stepZero = function () {

        $scope.step1 = true;
        $scope.step2 = false;
        $scope.step3 = false;
        $scope.stepOtp = false;
        $scope.stepVenue = false;
        $scope.stepPassword = false;
        $scope.progressbar = 0;

        /*   document.getElementById("step1").style.display = "block";
           document.getElementById("step2").style.display = "none";
           document.getElementById("step3").style.display = "none";*/


    }
    $scope.stepOne = function () {

        if ($scope.name == null || $scope.phone == null) {
            $scope.error = "তোমার নাম এবং ফোন নম্বর দিতে হবে। ";
            return;
        }

        /*Pixel Start*/
        fbq('track', 'Registration Ongoing', {           
            EventName: 'Registration Ongoing',
            EventTime: new Date().toISOString(),
            ClientUserAgent: navigator.userAgent,
            EventSourceURL: window.location.href,
        });
        /*Pixel End*/

        $scope.progressbar = 20;
        $scope.step1 = false;
        $scope.step2 = true;
        $scope.step3 = false;
        $scope.stepOtp = false;
        $scope.stepVenue = false;
        $scope.stepPassword = false;

        $scope.error = "";

        //$scope.sentOtp($scope.phone);


    }
    $scope.stepTwo = function () {
        if ($scope.board == "" || $scope.district == "") {
            $scope.error = "বোর্ড দিতে হবে।";
            return;
        }
        $scope.progressbar = 50;
        $scope.step1 = false;
        $scope.step2 = false;
        $scope.step3 = true;
        $scope.stepOtp = false;
        $scope.stepVenue = false;
        $scope.stepPassword = false;
        $scope.error = "";
        
    }
    $scope.verifyStudentGpa5 = function () {       

        //$('#loading').show();
        $scope.save = true;
        $scope.loading = true;
        $scope.progressbar = 75;
        $scope.error = "অনুগ্রহ করে অপেক্ষা করো। তোমার নিবন্ধনের তথ্য যাচাই–বাছাই চলছে।";

        if ($scope.roll == null || $scope.registration == null) {
            $scope.error = "রোল নম্বর এবং রেজিস্ট্রেশন নম্বর দিতে হবে।";
            return;
        }

        /*Check GP5*/

        let gpa_url = api_base_url + '/api/check-gp5?board=' + $scope.board + '&roll=' + $scope.roll + '&registration=' + $scope.registration + '&phone=' + $scope.phone;

        $http.post(gpa_url, {
            board: $scope.board, roll: $scope.roll, registration: $scope.registration,

        }).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            // console.log("response");
            // console.log(response);

            if(response.data.status_code == 201) {
                $scope.loading = false;
                Swal.fire({
                    title: 'Failed!',
                    text: response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                $scope.error = response.data.message;

                return;
            }

            document.getElementById("gpa_data").value = JSON.stringify(response.data.data);
            $scope.gpa_data = JSON.stringify(response.data.data);
            $scope.gpa_data2 = response.data.data;

            $('#loading').hide();

            if (response.data.data['is_gpa_5'] === true) {

                $scope.loading = false;
                $scope.progressbar = 75;
                $scope.step1 = false;
                $scope.step2 = false;
                $scope.step3 = false;
                $scope.stepOtp = false;
                $scope.stepVenue = true;
                $scope.stepPassword = false;
                $scope.success = "অভিনন্দন! তোমার নিবন্ধনের তথ্য যাচাই–বাছাই সম্পন্ন হয়েছে।";
                $scope.error = "";
                $scope.gpa5_check_status = 1;

                // $scope.sentOtp();
                //$scope.startTimer(300, 'otp');

            } else if(response.data.data['is_passed'] === true) {

                $scope.loading = false;
                $scope.progressbar = 75;
                $scope.step1 = false;
                $scope.step2 = false;
                $scope.step3 = false;
                $scope.stepOtp = true;
                $scope.stepVenue = false;
                $scope.stepPassword = false;
                $scope.success = "তোমার নিবন্ধনের তথ্য যাচাই–বাছাই সম্পন্ন হয়েছে।";
                $scope.error = "";
                $scope.gpa5_check_status = 0;

                // $scope.sentOtp();
                $scope.startTimer(300, 'otp');

            } else if(response.data.data['is_passed'] === false && response.data.data['correct_input'] === true) {

                Swal.fire({
                    title: 'Failed!',
                    text: "দুঃখিত! তুমি পরীক্ষায় উত্তীর্ণ হওনি",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                $scope.save = true;
                $scope.loading = false;
                $scope.error = "দুঃখিত! তুমি পরীক্ষায় উত্তীর্ণ হওনি, আগামী পরীক্ষার জন্য শুভকামনা!";
                return;

            } else {

                Swal.fire({
                    title: 'Failed!',
                    text: "দুঃখিত! তুমি ভুল তথ্য দিয়েছো, সঠিক তথ্য দিয়ে আবার চেষ্টা করো।",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                $scope.save = true;
                $scope.loading = false;
                $scope.error = "দুঃখিত! সঠিক তথ্য দিয়ে কিছুক্ষণ পর আবার চেষ্টা করো।";
                return;

            }

        }, function (response) {
            console.log("Error");
            $scope.loading = true;
            Swal.fire({
                title: 'Failed!',
                text: "তোমার তথ্যে ভুল থাকতে পারে তাই জিপিএ-৫ যাচাইকরণ সফল হয়নি। সঠিক তথ্য দিয়ে আবার চেষ্টা করো।",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            $scope.save = true;
            $scope.loading = false;
            $scope.error = "তোমার তথ্যে ভুল থাকতে পারে তাই জিপিএ-৫ যাচাইকরণ সফল হয়নি। সঠিক তথ্য দিয়ে আবার চেষ্টা করো।";
        });
        return;

    }
    $scope.sentOtpforGpa5 = function () {        

        $scope.success = "";
        console.log($scope);
        let url = api_base_url + '/api/sent-otp-gpa5?phone=' + $scope.phone + '&registration=' + $scope.registration;
        //console.log(url);
        $http.post(url, {
            phone: $scope.phone
        }).then(function (response) {

            console.log(response.data);
            if (response.data.status_code == 200) {
                $scope.startTimer(300, 'otp');
                console.log($scope.gpa_data);

                $scope.step1 = false;
                $scope.stepVenue = false;
                $scope.stepOtp = true;
                $scope.step2 = false;
                $scope.step3 = false;
            } else {

                $scope.stepZero();
                $scope.error = response.data.message;
                // $scope.step1 = true;
                //$scope.stepOtp = false;
                //$scope.step2 = false;
                //$scope.step3 = false;

            }
            $scope.success = "";
        });
        ////console.log(url)
    }

    $scope.sentOtp = function () {

        $scope.success = "";
        let url = api_base_url + '/api/again-sent-otp?phone=' + $scope.phone + '&registration=' + $scope.registration;
        //console.log(url);
        $http.post(url, {
            phone: $scope.phone
        }).then(function (response) {

            //console.log(response.data);
            if (response.data.status_code == 200) {
                $scope.startTimer(300, 'otp');
                console.log($scope.gpa_data);
            } else {

                $scope.stepZero();
                $scope.error = response.data.message;
                // $scope.step1 = true;
                //$scope.stepOtp = false;
                //$scope.step2 = false;
                //$scope.step3 = false;

            }
            $scope.success = "";
        });
        ////console.log(url)
    }
    $scope.stepVerify = function () {

        /*Pixel Start*/
        fbq('track', 'OTP Submit', {           
            EventName: 'OTP Submit',
            EventTime: new Date().toISOString(),
            ClientUserAgent: navigator.userAgent,
            EventSourceURL: window.location.href,
        });
        /*Pixel End*/

        let url = api_base_url + '/api/verify-otp/?phone=' + $scope.phone + '&otp=' + $scope.otp;
        console.log(url);
        $http.post(url, {
            /* phone: $scope.phone,
             otp: $scope.otp,*/
        }).then(function (response) {

            //console.log(response.data);
            if (response.data.status_code === 200) {

                $scope.progressbar = 100;
                $scope.step1 = false;
                $scope.stepOtp = false;
                $scope.stepVenue = false;
                $scope.step2 = false;
                $scope.step3 = false;
                $scope.stepPassword = true;
                document.getElementById("stepPassword").style.display = "block";
                $scope.error = "";
            } else {
                $scope.error = response.data.message;
            }
        });

    }

    $scope.saveStudent = function () {

        if ($scope.password == "") {
            $scope.error = "পাসওয়ার্ড দিতে হবে।";
            return;
        }        

        /*Save Student Start*/

        let ursl = "/student/save?name=" + $scope.name + "&phone=" + $scope.phone + "&board=" + $scope.board + "&roll=" + $scope.roll + "&registration=" + $scope.registration + "&district=" + $scope.district + "&password=" + $scope.password + "&gpa_data=" + $scope.gpa_data + "&gpa5_check_status=" + $scope.gpa5_check_status + "&event_division=" + $scope.event_division + "&event_district=" + $scope.event_district;
        // //console.log(ursl)
        let url = api_base_url + "/student/save";
        $http.post(url, {
            name: $scope.name,
            phone: $scope.phone,
            board: $scope.board,
            roll: $scope.roll,
            registration: $scope.registration,
            district: $scope.district,
            gpa_data: $scope.gpa_data,
            gpa_data2: $scope.gpa_data2,
            gpa5_check_status: $scope.gpa5_check_status,
            event_division: $scope.event_division,
            event_district: $scope.event_district,
            password: $scope.password, // data: response.data['data']

        }).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            if (response.data.status_code == 200) {

                /*Pixel Start*/
                fbq('track', 'Registration Complete', {           
                    EventName: 'Registration Complete',
                    EventTime: new Date().toISOString(),
                    ClientUserAgent: navigator.userAgent,
                    EventSourceURL: window.location.href,
                });
                /*Pixel End*/

                Swal.fire({
                    title: 'Success!', text: response.data.message, icon: 'success', confirmButtonText: 'Ok'
                });
                window.location.href = "/student/profile";
            } else {
                Swal.fire({
                    title: 'Failed!', text: response.data.message, icon: 'error', confirmButtonText: 'Ok'
                });

                //console.log(response.data.message)
                $scope.save = true;
            }


        }, function (response) {
            //console.log(response.data.message)
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            ////console.log(response);
            $scope.save = true;
        });

        return;
        /*Save Student End*/

        $scope.progressbar = 80;
        $scope.step1 = false;
        $scope.step2 = true;
        $scope.step3 = false;
        $scope.stepPassword = false;
        $scope.stepVenue = false;
        $scope.error = "";
    }


    $scope.getPercentage = function () {
        return $scope.progressbar;
    }

    $scope.district_list = [];
    $scope.boardChange = function () {
        $('#loading').show();
        let url = api_base_url + "/api/board-list/" + $scope.board;
        //console.log(url);
        $http.post(url, {}).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            ////console.log(response.data);
            $('#loading').hide();
            $scope.district_list = response.data;
            $scope.board_id = $scope.board;

        }, function (response) {
            $('#loading').hide();
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            ////console.log(response);
        });
    }


    $scope.educationBoardChange = function () {

        //console.log("fffffffff")
        $('#loading').show();
        let url = api_base_url + "/api/board-data/" + $scope.board_id;
        //console.log(url);
        $http.post(url, {}).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response.data);


            $scope.board_gpa = response.data.board.gpa_five;
            $scope.board_name = response.data.board.board_name;
            $scope.total_passed = response.data.board.total_passed;
            $('#loading').hide();
        }, function (response) {
            $('#loading').hide();
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            ////console.log(response);
        });
    }


    var numbers = {
        '১': 1, '২': 2, '৩': 3, '৪': 4, '৫': 5, '৬': 6, '৭': 7, '৮': 8, '৯': 9, '০': 0
    };

    $scope.replaceNumbers = function (input) {


        if (input === "" || input === null || input === undefined) {
            console.log("null" + input);
            return input;
        }

        var output = [];
        for (var i = 0; i < input.length; ++i) {
            if (numbers.hasOwnProperty(input[i])) {
                output.push(numbers[input[i]]);
            } else {
                output.push(input[i]);
            }
        }
        return output.join('');
    }

    $scope.bnToEn = function () {
        //console.log("TRy"+$scope.roll);
        // $scope.phone = $scope.replaceNumbers($scope.phone);
        //$scope.otp = $scope.replaceNumbers($scope.otp);
        //$scope.roll = $scope.replaceNumbers($scope.roll);
        // $scope.registration = $scope.replaceNumbers($scope.registration);

    }


    $scope.pixelTest = function () {

        console.log({
            UserInfo: {
                name: $scope.name, phone: $scope.phone,
            },
            EventName: 'CompleteRegistration',
            EventTime: new Date(),
            ClientUserAgent: navigator.userAgent,
            EventID: 0,
            EventSourceURL: window.location.href,
        });

        /*Pixel Start*/

        fbq('track', 'Registration Initiate', {
            UserInfo: {
                name: $scope.name, phone: $scope.phone,
            },
            EventName: 'Registration Initiate',
            EventTime: new Date().toISOString(),
            ClientUserAgent: navigator.userAgent,
            EventID: 'fpx_web_gp5_page',
            EventSourceURL: window.location.href,
        });

        /*Pixel End*/
    }

});

app.controller('verifyController', function ($scope, $http) {

    $scope.verifyGpa5 = function (id) {

        return;
        let url = "/api/verify-gpa5/" + id;
        $http.post(url, {}).then(function (response) {

            console.log(response.data);
            // this callback will be called asynchronously
            // when the response is available
            //console.log(response.data);

        }, function (response) {
            //console.log(response.data.message)
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            //console.log(response);
            console.log("Error");
        });
    }
});

app.controller('eventDivisionDistrictController', function ($scope, $http) {

    $scope.event_district_list = [];
    $scope.eventDivisionChange = function () {

        $('#loading').show();
        let url = api_base_url + "/api/district-list/" + $scope.event_division;
        //console.log(url);
        $http.post(url, {}).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            ////console.log(response.data);
            $('#loading').hide();
            $scope.event_district_list = response.data;

        }, function (response) {
            $('#loading').hide();
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            ////console.log(response);
        });
    }
});

function rollLengthVerify() {

    let roll = document.getElementById("roll").value;
    if (roll.length > 6) {
        document.getElementById("roll").value = roll.slice(0, 6);
    }
}

function regiLengthVerify() {

    let registration = document.getElementById("registration").value;
    if (registration.length > 10) {
        document.getElementById("registration").value = registration.slice(0, 10);
    }

}
