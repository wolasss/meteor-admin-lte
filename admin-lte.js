Template.AdminLTE.onCreated(function() {
    let self = this;
    let transitionDuration = 1000;
    let fixed = false;
    let sidebarMini = true;
    let $body = $('body');

    if (this.data) {
        transitionDuration =
            parseInt(this.data.transitionDuration, 10) || transitionDuration;
        fixed = this.data.fixed || fixed;
        sidebarMini = this.data.sidebarMini || sidebarMini;
    }

    self.isFinishedLoading = new ReactiveVar(false); //needed for transition
    self.isReady = new ReactiveVar(false);
    self.style = waitOnCSS(cssUrl());

    fixed && $body.addClass('layout-fixed');
    sidebarMini && $body.addClass('sidebar-mini');

    self.removeClasses = function() {
        fixed && $body.removeClass('layout-fixed');
        sidebarMini && $body.removeClass('sidebar-mini');
    };

    this.autorun(function() {
        if (self.style.ready()) {
            self.isFinishedLoading.set(true);

            setTimeout(function() {
                self.isReady.set(true);
            }, transitionDuration);
        }
    });
});

Template.AdminLTE.onDestroyed(function() {
    this.removeClasses();
    this.style.remove();
});

Template.AdminLTE.helpers({
    isReady: function() {
        return Template.instance().isReady.get();
    },

    isFinishedLoading: function() {
        return Template.instance().isFinishedLoading.get();
    },

    loadingTemplate: function() {
        return this.loadingTemplate || 'AdminLTE_loading';
    }
});

function cssUrl() {
    return '/packages/wolas_admin-lte/css/AdminLTE.min.css';
}

function waitOnCSS(url, timeout) {
    let isLoaded = new ReactiveVar(false);
    timeout = timeout || 5000;

    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;

    link.onload = function() {
        isLoaded.set(true);
    };

    if (link.addEventListener) {
        link.addEventListener('load',
            function() {
                isLoaded.set(true);
            },
            false);
    }

    link.onreadystatechange = function() {
        let state = link.readyState;
        if (state === 'loaded' || state === 'complete') {
            link.onreadystatechange = null;
            isLoaded.set(true);
        }
    };

    let cssnum = document.styleSheets.length;
    let ti = setInterval(function() {
        if (document.styleSheets.length > cssnum) {
            isLoaded.set(true);
            clearInterval(ti);
        }
    }, 10);

    setTimeout(function() {
        isLoaded.set(true);
    }, timeout);

    $(document.head).append(link);

    return {
        ready: function() {
            return isLoaded.get();
        },

        remove: function() {
            $('link[href="' + url + '"]').remove();
        }
    };
}
