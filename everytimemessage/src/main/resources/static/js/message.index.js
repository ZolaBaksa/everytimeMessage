


























































$().ready(function () {
    var $container = $('#container');
    var $messageBoxes = $container.find('div.messageboxes');
    var $messages = $container.find('div.messages');
    var $messageMore = $('#messageMore');
    var _set = {
      limitNum: 50,
      isRead: 0,
      lastMessageCreatedAt: '',
      isMessageBoxesRendered: false,
      isMessageBoxesLoadCompleted: false,
      boxId: 0,
      isMessagesRendered: false
    };
    var _fn = {
      init: function () {
        _fn.loadMessageBoxes(function (data) {
          _fn.appendMessageBoxes(data);
          if ($container.data('box-id') > 0) {
            _fn.openMessages($container.data('box-id'));
          } else {
            _set.isMessagesRendered = true;
          }
        });
  
        $messageBoxes.find('div.items').on('scroll', function () {
          _fn.onMessageBoxesScroll();
        }).on('click', 'a.item', function () {
          if (_set.isMessagesRendered === true) {
            _gfn.pushHistoryState($(this).attr('href'), {boxId: $(this).data('id')});
            _fn.openMessages($(this).data('id'));
          }
          return false;
        });
  
        $messages.on('click', 'div.title a.back', function () {
          history.go(-1);
        }).on('click', 'div.title a.refresh', function () {
          if (_set.boxId > 0 && _set.isMessagesRendered === true) {
            _fn.loadMessages(function (data) {
              _fn.appendMessages(data);
            });
          }
        }).on('click', 'div.title a.more', function () {
          _fn.openMessageMore();
        });
  
        $messageMore.find('a.close').on('click', function () {
          _fn.closeMessageMore();
        });
        $messageMore.on('click', 'ul li a', function () {
          _fn.onClickMoreMenu($(this).data('menu'));
        });
  
        setTimeout(function () {
          $(window).on('popstate', function () {
            if (history.state && history.state.boxId > 0) {
              _fn.openMessages(history.state.boxId);
            } else {
              _fn.closeMessages();
            }
            if ($messageMore.is(':visible')) {
              _fn.closeMessageMore();
            }
          });
        }, 0);
      },
      loadMessageBoxes: function (callback) {
        _set.isMessageBoxesRendered = false;
        $messageBoxes.find('div.items div.loading').show();
        var params = {
          limitNum: _set.limitNum,
          isRead: _set.isRead
        };
        if (_set.lastMessageCreatedAt) {
          params.lastMessageCreatedAt = _set.lastMessageCreatedAt;
        }
        $.ajax({
          url: _apiServerUrl + '/find/messageBox/list',
          xhrFields: {withCredentials: true},
          type: 'POST',
          data: params,
          success: function (data) {
            callback(data);
          }
        });
      },
      appendMessageBoxes: function (data) {
        var $loading = $messageBoxes.find('div.items div.loading');
        var $response = $(data).find('response');
        $response.find('box').each(function () {
          var $this = $(this);
          var id = Number($this.attr('id'));
          var nickname = $this.attr('nickname');
          var unreadCount = Number($this.attr('unread_count'));
          var $item = $('<a></a>').addClass('item').attr('href', '/message/' + id).data({id: id, nickname: nickname});
          if (id === _set.boxId) {
            $item.addClass('active');
            $messages.find('div.title h2').html(nickname);
          }
          $('<time></time>').text(_gfn.formatRelativeDate($this.attr('last_message_created_at'))).appendTo($item);
          $('<h3></h3>').html(nickname).appendTo($item);
          if (unreadCount > 0) {
            $item.addClass('unread');
            $('<p></p>').addClass('count').text('+' + unreadCount).appendTo($item);
          }
          $('<p></p>').addClass('text').html($this.attr('last_message_text')).appendTo($item);
          $item.insertBefore($loading);
          _set.lastMessageCreatedAt = $this.attr('last_message_created_at');
        });
        _set.isMessageBoxesRendered = true;
        $loading.hide();
        if ($response.find('box').length !== _set.limitNum) {
          if (_set.isRead === 0) {
            _set.isRead = 1;
            _set.lastMessageCreatedAt = '';
            _fn.loadMessageBoxes(function (data) {
              _fn.appendMessageBoxes(data);
            });
          } else {
            _set.isMessageBoxesLoadCompleted = true;
            if ($messageBoxes.find('div.items a.item').length === 0) {
              $('<div></div>').addClass('empty').html('<p>?????? ????????? ????????????</p>').insertBefore($loading);
            }
          }
        }
      },
      onMessageBoxesScroll: function () {
        if ($messageBoxes.is(':not(:visible)') || _set.isMessageBoxesRendered === false || _set.isMessageBoxesLoadCompleted === true) {
          return;
        }
        var $items = $messageBoxes.find('div.items');
        var scrollTop = $items.scrollTop();
        var remainingHeight = $items[0].scrollHeight - $items.height();
        if (scrollTop < remainingHeight - 300) {
          return;
        }
        _fn.loadMessageBoxes(function (data) {
          _fn.appendMessageBoxes(data);
        });
      },
      openMessages: function (boxId) {
        _set.boxId = boxId;
        $messageBoxes.removeClass('visible');
        $messageBoxes.find('div.items a.item').removeClass('active');
  
        var nickname = '';
        var $activeMessageBox = $messageBoxes.find('div.items a.item').filter(function () {
          return $(this).data('id') === _set.boxId;
        });
        if ($activeMessageBox.length > 0) {
          $activeMessageBox.addClass('active').removeClass('unread');
          $activeMessageBox.find('p.count').remove();
          nickname = $activeMessageBox.data('nickname');
        }
  
        $messages.addClass('visible').empty();
        var $title = $('<div></div>').addClass('title').appendTo($messages);
        $('<a></a>').addClass('back').text('??????').appendTo($title);
        $('<h2></h2>').html(nickname).appendTo($title);
        $('<a></a>').addClass('send').attr({'data-modal': 'messageSend', 'data-box-id': boxId}).text('?????? ?????????').appendTo($title);
        $('<a></a>').addClass('refresh').text('????????????').appendTo($title);
        $('<a></a>').addClass('more').text('?????????').appendTo($title);
        $('<div></div>').addClass('items').appendTo($messages);
        _fn.loadMessages(function (data) {
          _fn.appendMessages(data);
        });
      },
      loadMessages: function (callback) {
        _set.isMessagesRendered = false;
        var $items = $messages.find('div.items').empty();
        $('<div></div>').addClass('loading').appendTo($items);
        $.ajax({
          url: _apiServerUrl + '/find/messageBox/message/list',
          xhrFields: {withCredentials: true},
          type: 'POST',
          data: {
            box_id: _set.boxId
          },
          success: function (data) {
            callback(data);
          }
        });
      },
      appendMessages: function (data) {
        var $items = $messages.find('div.items');
        var $response = $(data).find('response');
        $response.find('message').each(function () {
          var $this = $(this);
          var $item = $('<div></div>').addClass('item');
          $('<time></time>').text(_gfn.formatRelativeDate($this.attr('created_at'))).appendTo($item);
          if ($this.attr('type') === '1') {
            $('<p></p>').addClass('type type1').text('?????? ??????').appendTo($item);
          } else if ($this.attr('type') === '2') {
            $('<p></p>').addClass('type type2').text('?????? ??????').appendTo($item);
          } else {
            $('<p></p>').addClass('type type0').text('??????').appendTo($item);
          }
          $('<p></p>').addClass('text').html($this.attr('text')).appendTo($item);
          $item.appendTo($items);
        });
        _set.isMessagesRendered = true;
        $items.find('div.loading').remove();
        if ($response.find('message').length > 0) {
          $messages.find('div.title a.send').attr('data-is-anonym', $response.attr('is_anonym'));
          if ($messageBoxes.find('div.items').is(':has(a.item.active)')) {
            var $recentMessageItem = $items.find('div.item').first();
            var $activeBoxItem = $messageBoxes.find('div.items a.item.active');
            $activeBoxItem.find('time').html($recentMessageItem.find('time').html());
            $activeBoxItem.find('p.text').html($recentMessageItem.find('p.text').html().split("<br>")[0]);
          }
        }
      },
      closeMessages: function () {
        $messageBoxes.addClass('visible');
        $messageBoxes.find('div.items a.item').removeClass('active');
        $messages.removeClass('visible').empty();
        _set.boxId = 0;
        _set.isMessagesRendered = true;
      },
      openMessageMore: function () {
        $messageMore.show();
      },
      closeMessageMore: function () {
        $messageMore.hide();
      },
      onClickMoreMenu: function (menu) {
        if (menu === 'removeAll') {
          var nickname = $messages.find('div.title h2').html();
          if (!confirm(nickname + '????????? ?????? ????????? ?????????????????????????')) {
            return;
          }
          $.ajax({
            url: _apiServerUrl + '/remove/messageBox/message/list',
            xhrFields: {withCredentials: true},
            type: 'POST',
            data: {
              box_id: _set.boxId
            },
            success: function () {
              $messageBoxes.find('div.items a.item.active').remove();
              history.go(-1);
            }
          });
        } else if (menu === 'block') {
          if (!confirm('?????? ?????? ??? ????????? ?????? ????????????, ?????? ???????????? ??? ????????????.')) {
            return;
          }
          $.ajax({
            url: _apiServerUrl + '/update/messageBox/block',
            xhrFields: {withCredentials: true},
            type: 'POST',
            data: {
              box_id: _set.boxId
            },
            success: function (data) {
              var responseCode = Number($(data).find('response').text());
              if (responseCode === -2) {
                alert('?????? ?????????????????????.');
              }
              _fn.closeMessageMore();
            }
          });
        } else if (menu === 'reportSpam') {
          if (!confirm('?????? ????????? ????????? ?????? ?????? ????????? ?????? ???????????????. ?????? ?????? ?????? ??? ????????? ?????? ???????????? ?????? ???????????? ??? ????????????.')) {
            return;
          }
          $.ajax({
            url: _apiServerUrl + '/update/messageBox/block',
            xhrFields: {withCredentials: true},
            type: 'POST',
            data: {
              box_id: _set.boxId,
              abuse_report: 'true'
            },
            success: function (data) {
              var responseCode = Number($(data).find('response').text());
              if (responseCode === -3) {
                alert('?????? ?????????????????????.');
              }
              _fn.closeMessageMore();
            }
          });
        }
      }
    };
    _fn.init();
  });
  