(self.webpackChunkjirayu_pw = self.webpackChunkjirayu_pw || []).push([
  [179],
  {
    282: (oo, $e, te) => {
      "use strict";
      function I(t) {
        return "function" == typeof t;
      }
      function P(t) {
        const n = t((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const ne = P(
        (t) =>
          function (n) {
            t(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, i) => `${i + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function De(t, e) {
        if (t) {
          const n = t.indexOf(e);
          0 <= n && t.splice(n, 1);
        }
      }
      class de {
        constructor(e) {
          (this.initialTeardown = e),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let e;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const o of n) o.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (I(r))
              try {
                r();
              } catch (o) {
                e = o instanceof ne ? o.errors : [o];
              }
            const { _finalizers: i } = this;
            if (i) {
              this._finalizers = null;
              for (const o of i)
                try {
                  Q(o);
                } catch (s) {
                  (e = e ?? []),
                    s instanceof ne ? (e = [...e, ...s.errors]) : e.push(s);
                }
            }
            if (e) throw new ne(e);
          }
        }
        add(e) {
          var n;
          if (e && e !== this)
            if (this.closed) Q(e);
            else {
              if (e instanceof de) {
                if (e.closed || e._hasParent(this)) return;
                e._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                e
              );
            }
        }
        _hasParent(e) {
          const { _parentage: n } = this;
          return n === e || (Array.isArray(n) && n.includes(e));
        }
        _addParent(e) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(e), n) : n ? [n, e] : e;
        }
        _removeParent(e) {
          const { _parentage: n } = this;
          n === e ? (this._parentage = null) : Array.isArray(n) && De(n, e);
        }
        remove(e) {
          const { _finalizers: n } = this;
          n && De(n, e), e instanceof de && e._removeParent(this);
        }
      }
      de.EMPTY = (() => {
        const t = new de();
        return (t.closed = !0), t;
      })();
      const U = de.EMPTY;
      function ge(t) {
        return (
          t instanceof de ||
          (t && "closed" in t && I(t.remove) && I(t.add) && I(t.unsubscribe))
        );
      }
      function Q(t) {
        I(t) ? t() : t.unsubscribe();
      }
      const X = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        J = {
          setTimeout(t, e, ...n) {
            const { delegate: r } = J;
            return r?.setTimeout
              ? r.setTimeout(t, e, ...n)
              : setTimeout(t, e, ...n);
          },
          clearTimeout(t) {
            const { delegate: e } = J;
            return (e?.clearTimeout || clearTimeout)(t);
          },
          delegate: void 0,
        };
      function Ee(t) {
        J.setTimeout(() => {
          const { onUnhandledError: e } = X;
          if (!e) throw t;
          e(t);
        });
      }
      function Je() {}
      const Dt = Wn("C", void 0, void 0);
      function Wn(t, e, n) {
        return { kind: t, value: e, error: n };
      }
      let jt = null;
      function pn(t) {
        if (X.useDeprecatedSynchronousErrorHandling) {
          const e = !jt;
          if ((e && (jt = { errorThrown: !1, error: null }), t(), e)) {
            const { errorThrown: n, error: r } = jt;
            if (((jt = null), n)) throw r;
          }
        } else t();
      }
      class wn extends de {
        constructor(e) {
          super(),
            (this.isStopped = !1),
            e
              ? ((this.destination = e), ge(e) && e.add(this))
              : (this.destination = et);
        }
        static create(e, n, r) {
          return new O(e, n, r);
        }
        next(e) {
          this.isStopped
            ? B(
                (function Or(t) {
                  return Wn("N", t, void 0);
                })(e),
                this
              )
            : this._next(e);
        }
        error(e) {
          this.isStopped
            ? B(
                (function pr(t) {
                  return Wn("E", void 0, t);
                })(e),
                this
              )
            : ((this.isStopped = !0), this._error(e));
        }
        complete() {
          this.isStopped
            ? B(Dt, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(e) {
          this.destination.next(e);
        }
        _error(e) {
          try {
            this.destination.error(e);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Se = Function.prototype.bind;
      function bt(t, e) {
        return Se.call(t, e);
      }
      class Cn {
        constructor(e) {
          this.partialObserver = e;
        }
        next(e) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(e);
            } catch (r) {
              S(r);
            }
        }
        error(e) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(e);
            } catch (r) {
              S(r);
            }
          else S(e);
        }
        complete() {
          const { partialObserver: e } = this;
          if (e.complete)
            try {
              e.complete();
            } catch (n) {
              S(n);
            }
        }
      }
      class O extends wn {
        constructor(e, n, r) {
          let i;
          if ((super(), I(e) || !e))
            i = {
              next: e ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let o;
            this && X.useDeprecatedNextContext
              ? ((o = Object.create(e)),
                (o.unsubscribe = () => this.unsubscribe()),
                (i = {
                  next: e.next && bt(e.next, o),
                  error: e.error && bt(e.error, o),
                  complete: e.complete && bt(e.complete, o),
                }))
              : (i = e);
          }
          this.destination = new Cn(i);
        }
      }
      function S(t) {
        X.useDeprecatedSynchronousErrorHandling
          ? (function Et(t) {
              X.useDeprecatedSynchronousErrorHandling &&
                jt &&
                ((jt.errorThrown = !0), (jt.error = t));
            })(t)
          : Ee(t);
      }
      function B(t, e) {
        const { onStoppedNotification: n } = X;
        n && J.setTimeout(() => n(t, e));
      }
      const et = {
          closed: !0,
          next: Je,
          error: function ae(t) {
            throw t;
          },
          complete: Je,
        },
        wt =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Ct(t) {
        return t;
      }
      let Fe = (() => {
        class t {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new t();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, i) {
            const o = (function tn(t) {
              return (
                (t && t instanceof wn) ||
                ((function xr(t) {
                  return t && I(t.next) && I(t.error) && I(t.complete);
                })(t) &&
                  ge(t))
              );
            })(n)
              ? n
              : new O(n, r, i);
            return (
              pn(() => {
                const { operator: s, source: a } = this;
                o.add(
                  s
                    ? s.call(o, a)
                    : a
                    ? this._subscribe(o)
                    : this._trySubscribe(o)
                );
              }),
              o
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = ai(r))((i, o) => {
              const s = new O({
                next: (a) => {
                  try {
                    n(a);
                  } catch (l) {
                    o(l), s.unsubscribe();
                  }
                },
                error: o,
                complete: i,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [wt]() {
            return this;
          }
          pipe(...n) {
            return (function Mn(t) {
              return 0 === t.length
                ? Ct
                : 1 === t.length
                ? t[0]
                : function (n) {
                    return t.reduce((r, i) => i(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = ai(n))((r, i) => {
              let o;
              this.subscribe(
                (s) => (o = s),
                (s) => i(s),
                () => r(o)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function ai(t) {
        var e;
        return null !== (e = t ?? X.Promise) && void 0 !== e ? e : Promise;
      }
      const Nt = P(
        (t) =>
          function () {
            t(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let ct = (() => {
        class t extends Fe {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Ut(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Nt();
          }
          next(n) {
            pn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            pn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            pn(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: i, observers: o } = this;
            return r || i
              ? U
              : ((this.currentObservers = null),
                o.push(n),
                new de(() => {
                  (this.currentObservers = null), De(o, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: i, isStopped: o } = this;
            r ? n.error(i) : o && n.complete();
          }
          asObservable() {
            const n = new Fe();
            return (n.source = this), n;
          }
        }
        return (t.create = (e, n) => new Ut(e, n)), t;
      })();
      class Ut extends ct {
        constructor(e, n) {
          super(), (this.destination = e), (this.source = n);
        }
        next(e) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, e);
        }
        error(e) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, e);
        }
        complete() {
          var e, n;
          null ===
            (n =
              null === (e = this.destination) || void 0 === e
                ? void 0
                : e.complete) ||
            void 0 === n ||
            n.call(e);
        }
        _subscribe(e) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(e)) && void 0 !== r
            ? r
            : U;
        }
      }
      class We extends ct {
        constructor(e) {
          super(), (this._value = e);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(e) {
          const n = super._subscribe(e);
          return !n.closed && e.next(this._value), n;
        }
        getValue() {
          const { hasError: e, thrownError: n, _value: r } = this;
          if (e) throw n;
          return this._throwIfClosed(), r;
        }
        next(e) {
          super.next((this._value = e));
        }
      }
      function ye(t) {
        return (e) => {
          if (
            (function He(t) {
              return I(t?.lift);
            })(e)
          )
            return e.lift(function (n) {
              try {
                return t(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function Te(t, e, n, r, i) {
        return new Sn(t, e, n, r, i);
      }
      class Sn extends wn {
        constructor(e, n, r, i, o, s) {
          super(e),
            (this.onFinalize = o),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (l) {
                    e.error(l);
                  }
                }
              : super._next),
            (this._error = i
              ? function (a) {
                  try {
                    i(a);
                  } catch (l) {
                    e.error(l);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    e.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var e;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (e = this.onFinalize) ||
                  void 0 === e ||
                  e.call(this));
          }
        }
      }
      function Ae(t, e) {
        return ye((n, r) => {
          let i = 0;
          n.subscribe(
            Te(r, (o) => {
              r.next(t.call(e, o, i++));
            })
          );
        });
      }
      function gr(t) {
        return this instanceof gr ? ((this.v = t), this) : new gr(t);
      }
      function _h(t) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          e = t[Symbol.asyncIterator];
        return e
          ? e.call(t)
          : ((t = (function Zl(t) {
              var e = "function" == typeof Symbol && Symbol.iterator,
                n = e && t[e],
                r = 0;
              if (n) return n.call(t);
              if (t && "number" == typeof t.length)
                return {
                  next: function () {
                    return (
                      t && r >= t.length && (t = void 0),
                      { value: t && t[r++], done: !t }
                    );
                  },
                };
              throw new TypeError(
                e
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(t)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(o) {
          n[o] =
            t[o] &&
            function (s) {
              return new Promise(function (a, l) {
                !(function i(o, s, a, l) {
                  Promise.resolve(l).then(function (u) {
                    o({ value: u, done: a });
                  }, s);
                })(a, l, (s = t[o](s)).done, s.value);
              });
            };
        }
      }
      const vh = (t) =>
        t && "number" == typeof t.length && "function" != typeof t;
      function Dh(t) {
        return I(t?.then);
      }
      function Eh(t) {
        return I(t[wt]);
      }
      function bh(t) {
        return Symbol.asyncIterator && I(t?.[Symbol.asyncIterator]);
      }
      function wh(t) {
        return new TypeError(
          `You provided ${
            null !== t && "object" == typeof t ? "an invalid object" : `'${t}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Ch = (function zw() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Mh(t) {
        return I(t?.[Ch]);
      }
      function Sh(t) {
        return (function yh(t, e, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var i,
            r = n.apply(t, e || []),
            o = [];
          return (
            (i = {}),
            s("next"),
            s("throw"),
            s("return"),
            (i[Symbol.asyncIterator] = function () {
              return this;
            }),
            i
          );
          function s(f) {
            r[f] &&
              (i[f] = function (h) {
                return new Promise(function (p, m) {
                  o.push([f, h, p, m]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function l(f) {
                f.value instanceof gr
                  ? Promise.resolve(f.value.v).then(u, c)
                  : d(o[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(o[0][3], p);
            }
          }
          function u(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
          }
        })(this, arguments, function* () {
          const n = t.getReader();
          try {
            for (;;) {
              const { value: r, done: i } = yield gr(n.read());
              if (i) return yield gr(void 0);
              yield yield gr(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Ih(t) {
        return I(t?.getReader);
      }
      function nn(t) {
        if (t instanceof Fe) return t;
        if (null != t) {
          if (Eh(t))
            return (function Gw(t) {
              return new Fe((e) => {
                const n = t[wt]();
                if (I(n.subscribe)) return n.subscribe(e);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(t);
          if (vh(t))
            return (function qw(t) {
              return new Fe((e) => {
                for (let n = 0; n < t.length && !e.closed; n++) e.next(t[n]);
                e.complete();
              });
            })(t);
          if (Dh(t))
            return (function Ww(t) {
              return new Fe((e) => {
                t.then(
                  (n) => {
                    e.closed || (e.next(n), e.complete());
                  },
                  (n) => e.error(n)
                ).then(null, Ee);
              });
            })(t);
          if (bh(t)) return Th(t);
          if (Mh(t))
            return (function Kw(t) {
              return new Fe((e) => {
                for (const n of t) if ((e.next(n), e.closed)) return;
                e.complete();
              });
            })(t);
          if (Ih(t))
            return (function Zw(t) {
              return Th(Sh(t));
            })(t);
        }
        throw wh(t);
      }
      function Th(t) {
        return new Fe((e) => {
          (function Qw(t, e) {
            var n, r, i, o;
            return (function mh(t, e, n, r) {
              return new (n || (n = Promise))(function (o, s) {
                function a(c) {
                  try {
                    u(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  try {
                    u(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  c.done
                    ? o(c.value)
                    : (function i(o) {
                        return o instanceof n
                          ? o
                          : new n(function (s) {
                              s(o);
                            });
                      })(c.value).then(a, l);
                }
                u((r = r.apply(t, e || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = _h(t); !(r = yield n.next()).done; )
                  if ((e.next(r.value), e.closed)) return;
              } catch (s) {
                i = { error: s };
              } finally {
                try {
                  r && !r.done && (o = n.return) && (yield o.call(n));
                } finally {
                  if (i) throw i.error;
                }
              }
              e.complete();
            });
          })(t, e).catch((n) => e.error(n));
        });
      }
      function Kn(t, e, n, r = 0, i = !1) {
        const o = e.schedule(function () {
          n(), i ? t.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((t.add(o), !i)) return o;
      }
      function Cs(t, e, n = 1 / 0) {
        return I(e)
          ? Cs((r, i) => Ae((o, s) => e(r, o, i, s))(nn(t(r, i))), n)
          : ("number" == typeof e && (n = e),
            ye((r, i) =>
              (function Yw(t, e, n, r, i, o, s, a) {
                const l = [];
                let u = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !l.length && !u && e.complete();
                  },
                  h = (m) => (u < r ? p(m) : l.push(m)),
                  p = (m) => {
                    o && e.next(m), u++;
                    let y = !1;
                    nn(n(m, c++)).subscribe(
                      Te(
                        e,
                        (v) => {
                          i?.(v), o ? h(v) : e.next(v);
                        },
                        () => {
                          y = !0;
                        },
                        void 0,
                        () => {
                          if (y)
                            try {
                              for (u--; l.length && u < r; ) {
                                const v = l.shift();
                                s ? Kn(e, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              e.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  t.subscribe(
                    Te(e, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, i, t, n)
            ));
      }
      function Ah(t = 1 / 0) {
        return Cs(Ct, t);
      }
      const Ql = new Fe((t) => t.complete());
      function Yl(t) {
        return t[t.length - 1];
      }
      function Nh(t) {
        return I(Yl(t)) ? t.pop() : void 0;
      }
      function so(t) {
        return (function Jw(t) {
          return t && I(t.schedule);
        })(Yl(t))
          ? t.pop()
          : void 0;
      }
      function Fh(t, e = 0) {
        return ye((n, r) => {
          n.subscribe(
            Te(
              r,
              (i) => Kn(r, t, () => r.next(i), e),
              () => Kn(r, t, () => r.complete(), e),
              (i) => Kn(r, t, () => r.error(i), e)
            )
          );
        });
      }
      function Oh(t, e = 0) {
        return ye((n, r) => {
          r.add(t.schedule(() => n.subscribe(r), e));
        });
      }
      function xh(t, e) {
        if (!t) throw new Error("Iterable cannot be null");
        return new Fe((n) => {
          Kn(n, e, () => {
            const r = t[Symbol.asyncIterator]();
            Kn(
              n,
              e,
              () => {
                r.next().then((i) => {
                  i.done ? n.complete() : n.next(i.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function li(t, e) {
        return e
          ? (function sC(t, e) {
              if (null != t) {
                if (Eh(t))
                  return (function tC(t, e) {
                    return nn(t).pipe(Oh(e), Fh(e));
                  })(t, e);
                if (vh(t))
                  return (function rC(t, e) {
                    return new Fe((n) => {
                      let r = 0;
                      return e.schedule(function () {
                        r === t.length
                          ? n.complete()
                          : (n.next(t[r++]), n.closed || this.schedule());
                      });
                    });
                  })(t, e);
                if (Dh(t))
                  return (function nC(t, e) {
                    return nn(t).pipe(Oh(e), Fh(e));
                  })(t, e);
                if (bh(t)) return xh(t, e);
                if (Mh(t))
                  return (function iC(t, e) {
                    return new Fe((n) => {
                      let r;
                      return (
                        Kn(n, e, () => {
                          (r = t[Ch]()),
                            Kn(
                              n,
                              e,
                              () => {
                                let i, o;
                                try {
                                  ({ value: i, done: o } = r.next());
                                } catch (s) {
                                  return void n.error(s);
                                }
                                o ? n.complete() : n.next(i);
                              },
                              0,
                              !0
                            );
                        }),
                        () => I(r?.return) && r.return()
                      );
                    });
                  })(t, e);
                if (Ih(t))
                  return (function oC(t, e) {
                    return xh(Sh(t), e);
                  })(t, e);
              }
              throw wh(t);
            })(t, e)
          : nn(t);
      }
      function Rr(...t) {
        return li(t, so(t));
      }
      function Xl(t = {}) {
        const {
          connector: e = () => new ct(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: i = !0,
        } = t;
        return (o) => {
          let s,
            a,
            l,
            u = 0,
            c = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (s = l = void 0), (c = d = !1);
            },
            p = () => {
              const m = s;
              h(), m?.unsubscribe();
            };
          return ye((m, y) => {
            u++, !d && !c && f();
            const v = (l = l ?? e());
            y.add(() => {
              u--, 0 === u && !d && !c && (a = Jl(p, i));
            }),
              v.subscribe(y),
              !s &&
                u > 0 &&
                ((s = new O({
                  next: (g) => v.next(g),
                  error: (g) => {
                    (d = !0), f(), (a = Jl(h, n, g)), v.error(g);
                  },
                  complete: () => {
                    (c = !0), f(), (a = Jl(h, r)), v.complete();
                  },
                })),
                nn(m).subscribe(s));
          })(o);
        };
      }
      function Jl(t, e, ...n) {
        if (!0 === e) return void t();
        if (!1 === e) return;
        const r = new O({
          next: () => {
            r.unsubscribe(), t();
          },
        });
        return nn(e(...n)).subscribe(r);
      }
      function cC(t, e) {
        return t === e;
      }
      function _e(t) {
        for (let e in t) if (t[e] === _e) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function eu(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function Ke(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(Ke).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return `${t.overriddenName}`;
        if (t.name) return `${t.name}`;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function tu(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const dC = _e({ __forward_ref__: _e });
      function we(t) {
        return (
          (t.__forward_ref__ = we),
          (t.toString = function () {
            return Ke(this());
          }),
          t
        );
      }
      function j(t) {
        return (function nu(t) {
          return (
            "function" == typeof t &&
            t.hasOwnProperty(dC) &&
            t.__forward_ref__ === we
          );
        })(t)
          ? t()
          : t;
      }
      function ru(t) {
        return t && !!t.ɵproviders;
      }
      const Rh = "https://g.co/ng/security#xss";
      class _ extends Error {
        constructor(e, n) {
          super(
            (function Ms(t, e) {
              return `NG0${Math.abs(t)}${e ? ": " + e : ""}`;
            })(e, n)
          ),
            (this.code = e);
        }
      }
      function $(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function Ss(t, e) {
        throw new _(-201, !1);
      }
      function rn(t, e) {
        null == t &&
          (function pe(t, e, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${t}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${e} <=Actual]`)
            );
          })(e, t, null, "!=");
      }
      function ee(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function zt(t) {
        return { providers: t.providers || [], imports: t.imports || [] };
      }
      function Is(t) {
        return Ph(t, Ts) || Ph(t, Lh);
      }
      function Ph(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function kh(t) {
        return t && (t.hasOwnProperty(iu) || t.hasOwnProperty(_C))
          ? t[iu]
          : null;
      }
      const Ts = _e({ ɵprov: _e }),
        iu = _e({ ɵinj: _e }),
        Lh = _e({ ngInjectableDef: _e }),
        _C = _e({ ngInjectorDef: _e });
      var H = (() => (
        ((H = H || {})[(H.Default = 0)] = "Default"),
        (H[(H.Host = 1)] = "Host"),
        (H[(H.Self = 2)] = "Self"),
        (H[(H.SkipSelf = 4)] = "SkipSelf"),
        (H[(H.Optional = 8)] = "Optional"),
        H
      ))();
      let ou;
      function Ft(t) {
        const e = ou;
        return (ou = t), e;
      }
      function Bh(t, e, n) {
        const r = Is(t);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & H.Optional
          ? null
          : void 0 !== e
          ? e
          : void Ss(Ke(t));
      }
      const Ce = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        ao = {},
        su = "__NG_DI_FLAG__",
        As = "ngTempTokenPath",
        DC = /\n/gm,
        Hh = "__source";
      let ui;
      function _r(t) {
        const e = ui;
        return (ui = t), e;
      }
      function wC(t, e = H.Default) {
        if (void 0 === ui) throw new _(-203, !1);
        return null === ui
          ? Bh(t, void 0, e)
          : ui.get(t, e & H.Optional ? null : void 0, e);
      }
      function F(t, e = H.Default) {
        return (
          (function Vh() {
            return ou;
          })() || wC
        )(j(t), e);
      }
      function ve(t, e = H.Default) {
        return F(t, Ns(e));
      }
      function Ns(t) {
        return typeof t > "u" || "number" == typeof t
          ? t
          : 0 |
              (t.optional && 8) |
              (t.host && 1) |
              (t.self && 2) |
              (t.skipSelf && 4);
      }
      function au(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = j(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new _(900, !1);
            let i,
              o = H.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                l = CC(a);
              "number" == typeof l
                ? -1 === l
                  ? (i = a.token)
                  : (o |= l)
                : (i = a);
            }
            e.push(F(i, o));
          } else e.push(F(r));
        }
        return e;
      }
      function lo(t, e) {
        return (t[su] = e), (t.prototype[su] = e), t;
      }
      function CC(t) {
        return t[su];
      }
      function Zn(t) {
        return { toString: t }.toString();
      }
      var Tn = (() => (
          ((Tn = Tn || {})[(Tn.OnPush = 0)] = "OnPush"),
          (Tn[(Tn.Default = 1)] = "Default"),
          Tn
        ))(),
        Ot = (() => {
          return (
            ((t = Ot || (Ot = {}))[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            Ot
          );
          var t;
        })();
      const Qn = {},
        le = [],
        Fs = _e({ ɵcmp: _e }),
        lu = _e({ ɵdir: _e }),
        uu = _e({ ɵpipe: _e }),
        Uh = _e({ ɵmod: _e }),
        Yn = _e({ ɵfac: _e }),
        uo = _e({ __NG_ELEMENT_ID__: _e }),
        $h = _e({ __NG_ENV_ID__: _e });
      function zh(t, e, n) {
        let r = t.length;
        for (;;) {
          const i = t.indexOf(e, n);
          if (-1 === i) return i;
          if (0 === i || t.charCodeAt(i - 1) <= 32) {
            const o = e.length;
            if (i + o === r || t.charCodeAt(i + o) <= 32) return i;
          }
          n = i + 1;
        }
      }
      function cu(t, e, n) {
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ("number" == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              s = n[r++],
              a = n[r++];
            t.setAttribute(e, s, a, o);
          } else {
            const o = i,
              s = n[++r];
            qh(o) ? t.setProperty(e, o, s) : t.setAttribute(e, o, s), r++;
          }
        }
        return r;
      }
      function Gh(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function qh(t) {
        return 64 === t.charCodeAt(0);
      }
      function co(t, e) {
        if (null !== e && 0 !== e.length)
          if (null === t || 0 === t.length) t = e.slice();
          else {
            let n = -1;
            for (let r = 0; r < e.length; r++) {
              const i = e[r];
              "number" == typeof i
                ? (n = i)
                : 0 === n ||
                  Wh(t, n, i, null, -1 === n || 2 === n ? e[++r] : null);
            }
          }
        return t;
      }
      function Wh(t, e, n, r, i) {
        let o = 0,
          s = t.length;
        if (-1 === e) s = -1;
        else
          for (; o < t.length; ) {
            const a = t[o++];
            if ("number" == typeof a) {
              if (a === e) {
                s = -1;
                break;
              }
              if (a > e) {
                s = o - 1;
                break;
              }
            }
          }
        for (; o < t.length; ) {
          const a = t[o];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== i && (t[o + 1] = i));
            if (r === t[o + 1]) return void (t[o + 2] = i);
          }
          o++, null !== r && o++, null !== i && o++;
        }
        -1 !== s && (t.splice(s, 0, e), (o = s + 1)),
          t.splice(o++, 0, n),
          null !== r && t.splice(o++, 0, r),
          null !== i && t.splice(o++, 0, i);
      }
      const Kh = "ng-template";
      function IC(t, e, n) {
        let r = 0,
          i = !0;
        for (; r < t.length; ) {
          let o = t[r++];
          if ("string" == typeof o && i) {
            const s = t[r++];
            if (n && "class" === o && -1 !== zh(s.toLowerCase(), e, 0))
              return !0;
          } else {
            if (1 === o) {
              for (; r < t.length && "string" == typeof (o = t[r++]); )
                if (o.toLowerCase() === e) return !0;
              return !1;
            }
            "number" == typeof o && (i = !1);
          }
        }
        return !1;
      }
      function Zh(t) {
        return 4 === t.type && t.value !== Kh;
      }
      function TC(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Kh);
      }
      function AC(t, e, n) {
        let r = 4;
        const i = t.attrs || [],
          o = (function OC(t) {
            for (let e = 0; e < t.length; e++) if (Gh(t[e])) return e;
            return t.length;
          })(i);
        let s = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !TC(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (mn(r)) return !1;
                  s = !0;
                }
              } else {
                const u = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!IC(t.attrs, u, n)) {
                    if (mn(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = NC(8 & r ? "class" : l, i, Zh(t), n);
                if (-1 === d) {
                  if (mn(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== u) {
                  let f;
                  f = d > o ? "" : i[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== zh(h, u, 0)) || (2 & r && u !== f)) {
                    if (mn(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !mn(r) && !mn(l)) return !1;
            if (s && mn(l)) continue;
            (s = !1), (r = l | (1 & r));
          }
        }
        return mn(r) || s;
      }
      function mn(t) {
        return 0 == (1 & t);
      }
      function NC(t, e, n, r) {
        if (null === e) return -1;
        let i = 0;
        if (r || !n) {
          let o = !1;
          for (; i < e.length; ) {
            const s = e[i];
            if (s === t) return i;
            if (3 === s || 6 === s) o = !0;
            else {
              if (1 === s || 2 === s) {
                let a = e[++i];
                for (; "string" == typeof a; ) a = e[++i];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                i += 4;
                continue;
              }
            }
            i += o ? 1 : 2;
          }
          return -1;
        }
        return (function xC(t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Qh(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (AC(t, e[r], n)) return !0;
        return !1;
      }
      function RC(t, e) {
        e: for (let n = 0; n < e.length; n++) {
          const r = e[n];
          if (t.length === r.length) {
            for (let i = 0; i < t.length; i++) if (t[i] !== r[i]) continue e;
            return !0;
          }
        }
        return !1;
      }
      function Yh(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function PC(t) {
        let e = t[0],
          n = 1,
          r = 2,
          i = "",
          o = !1;
        for (; n < t.length; ) {
          let s = t[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = t[++n];
              i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (i += "." + s) : 4 & r && (i += " " + s);
          else
            "" !== i && !mn(s) && ((e += Yh(o, i)), (i = "")),
              (r = s),
              (o = o || !mn(r));
          n++;
        }
        return "" !== i && (e += Yh(o, i)), e;
      }
      function ci(t) {
        return Zn(() => {
          const e = Jh(t),
            n = {
              ...e,
              decls: t.decls,
              vars: t.vars,
              template: t.template,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              onPush: t.changeDetection === Tn.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (e.standalone && t.dependencies) || null,
              getStandaloneInjector: null,
              data: t.data || {},
              encapsulation: t.encapsulation || Ot.Emulated,
              styles: t.styles || le,
              _: null,
              schemas: t.schemas || null,
              tView: null,
              id: "",
            };
          ep(n);
          const r = t.dependencies;
          return (
            (n.directiveDefs = Os(r, !1)),
            (n.pipeDefs = Os(r, !0)),
            (n.id = (function $C(t) {
              let e = 0;
              const n = [
                t.selectors,
                t.ngContentSelectors,
                t.hostVars,
                t.hostAttrs,
                t.consts,
                t.vars,
                t.decls,
                t.encapsulation,
                t.standalone,
                t.exportAs,
                JSON.stringify(t.inputs),
                JSON.stringify(t.outputs),
                Object.getOwnPropertyNames(t.type.prototype),
                !!t.contentQueries,
                !!t.viewQuery,
              ].join("|");
              for (const i of n) e = (Math.imul(31, e) + i.charCodeAt(0)) << 0;
              return (e += 2147483648), "c" + e;
            })(n)),
            n
          );
        });
      }
      function BC(t) {
        return ue(t) || dt(t);
      }
      function HC(t) {
        return null !== t;
      }
      function on(t) {
        return Zn(() => ({
          type: t.type,
          bootstrap: t.bootstrap || le,
          declarations: t.declarations || le,
          imports: t.imports || le,
          exports: t.exports || le,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        }));
      }
      function Xh(t, e) {
        if (null == t) return Qn;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let i = t[r],
              o = i;
            Array.isArray(i) && ((o = i[1]), (i = i[0])),
              (n[i] = r),
              e && (e[i] = o);
          }
        return n;
      }
      function G(t) {
        return Zn(() => {
          const e = Jh(t);
          return ep(e), e;
        });
      }
      function ue(t) {
        return t[Fs] || null;
      }
      function dt(t) {
        return t[lu] || null;
      }
      function Rt(t) {
        return t[uu] || null;
      }
      function Jh(t) {
        const e = {};
        return {
          type: t.type,
          providersResolver: null,
          factory: null,
          hostBindings: t.hostBindings || null,
          hostVars: t.hostVars || 0,
          hostAttrs: t.hostAttrs || null,
          contentQueries: t.contentQueries || null,
          declaredInputs: e,
          exportAs: t.exportAs || null,
          standalone: !0 === t.standalone,
          selectors: t.selectors || le,
          viewQuery: t.viewQuery || null,
          features: t.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: Xh(t.inputs, e),
          outputs: Xh(t.outputs),
        };
      }
      function ep(t) {
        t.features?.forEach((e) => e(t));
      }
      function Os(t, e) {
        if (!t) return null;
        const n = e ? Rt : BC;
        return () =>
          ("function" == typeof t ? t() : t).map((r) => n(r)).filter(HC);
      }
      const Ze = 0,
        w = 1,
        K = 2,
        Oe = 3,
        gn = 4,
        Pr = 5,
        ft = 6,
        di = 7,
        Le = 8,
        fi = 9,
        kr = 10,
        q = 11,
        ho = 12,
        tp = 13,
        hi = 14,
        ze = 15,
        po = 16,
        pi = 17,
        An = 18,
        mo = 19,
        np = 20,
        vr = 21,
        Xn = 22,
        xs = 23,
        Rs = 24,
        ie = 25,
        du = 1,
        rp = 2,
        Nn = 7,
        Ps = 8,
        mi = 9,
        ot = 11;
      function qt(t) {
        return Array.isArray(t) && "object" == typeof t[du];
      }
      function Pt(t) {
        return Array.isArray(t) && !0 === t[du];
      }
      function fu(t) {
        return 0 != (4 & t.flags);
      }
      function Lr(t) {
        return t.componentOffset > -1;
      }
      function ks(t) {
        return 1 == (1 & t.flags);
      }
      function yn(t) {
        return !!t.template;
      }
      function hu(t) {
        return 0 != (512 & t[K]);
      }
      function Vr(t, e) {
        return t.hasOwnProperty(Yn) ? t[Yn] : null;
      }
      let KC =
          Ce.WeakRef ??
          class WC {
            constructor(e) {
              this.ref = e;
            }
            deref() {
              return this.ref;
            }
          },
        QC = 0,
        Fn = null,
        Ls = !1;
      function nt(t) {
        const e = Fn;
        return (Fn = t), e;
      }
      class lp {
        constructor() {
          (this.id = QC++),
            (this.ref = (function ZC(t) {
              return new KC(t);
            })(this)),
            (this.producers = new Map()),
            (this.consumers = new Map()),
            (this.trackingVersion = 0),
            (this.valueVersion = 0);
        }
        consumerPollProducersForChange() {
          for (const [e, n] of this.producers) {
            const r = n.producerNode.deref();
            if (void 0 !== r && n.atTrackingVersion === this.trackingVersion) {
              if (r.producerPollStatus(n.seenValueVersion)) return !0;
            } else this.producers.delete(e), r?.consumers.delete(this.id);
          }
          return !1;
        }
        producerMayHaveChanged() {
          const e = Ls;
          Ls = !0;
          try {
            for (const [n, r] of this.consumers) {
              const i = r.consumerNode.deref();
              void 0 !== i && i.trackingVersion === r.atTrackingVersion
                ? i.onConsumerDependencyMayHaveChanged()
                : (this.consumers.delete(n), i?.producers.delete(this.id));
            }
          } finally {
            Ls = e;
          }
        }
        producerAccessed() {
          if (Ls) throw new Error("");
          if (null === Fn) return;
          let e = Fn.producers.get(this.id);
          void 0 === e
            ? ((e = {
                consumerNode: Fn.ref,
                producerNode: this.ref,
                seenValueVersion: this.valueVersion,
                atTrackingVersion: Fn.trackingVersion,
              }),
              Fn.producers.set(this.id, e),
              this.consumers.set(Fn.id, e))
            : ((e.seenValueVersion = this.valueVersion),
              (e.atTrackingVersion = Fn.trackingVersion));
        }
        get hasProducers() {
          return this.producers.size > 0;
        }
        get producerUpdatesAllowed() {
          return !1 !== Fn?.consumerAllowSignalWrites;
        }
        producerPollStatus(e) {
          return (
            this.valueVersion !== e ||
            (this.onProducerUpdateValueVersion(), this.valueVersion !== e)
          );
        }
      }
      let up = null;
      const dp = () => {};
      class eM extends lp {
        constructor(e, n, r) {
          super(),
            (this.watch = e),
            (this.schedule = n),
            (this.dirty = !1),
            (this.cleanupFn = dp),
            (this.registerOnCleanup = (i) => {
              this.cleanupFn = i;
            }),
            (this.consumerAllowSignalWrites = r);
        }
        notify() {
          this.dirty || this.schedule(this), (this.dirty = !0);
        }
        onConsumerDependencyMayHaveChanged() {
          this.notify();
        }
        onProducerUpdateValueVersion() {}
        run() {
          if (
            ((this.dirty = !1),
            0 !== this.trackingVersion &&
              !this.consumerPollProducersForChange())
          )
            return;
          const e = nt(this);
          this.trackingVersion++;
          try {
            this.cleanupFn(),
              (this.cleanupFn = dp),
              this.watch(this.registerOnCleanup);
          } finally {
            nt(e);
          }
        }
        cleanup() {
          this.cleanupFn();
        }
      }
      class tM {
        constructor(e, n, r) {
          (this.previousValue = e),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function fp(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = rM), nM;
      }
      function nM() {
        const t = pp(this),
          e = t?.current;
        if (e) {
          const n = t.previous;
          if (n === Qn) t.previous = e;
          else for (let r in e) n[r] = e[r];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function rM(t, e, n, r) {
        const i = this.declaredInputs[n],
          o =
            pp(t) ||
            (function iM(t, e) {
              return (t[hp] = e);
            })(t, { previous: Qn, current: null }),
          s = o.current || (o.current = {}),
          a = o.previous,
          l = a[i];
        (s[i] = new tM(l && l.currentValue, e, a === Qn)), (t[r] = e);
      }
      const hp = "__ngSimpleChanges__";
      function pp(t) {
        return t[hp] || null;
      }
      const On = function (t, e, n) {};
      function Ie(t) {
        for (; Array.isArray(t); ) t = t[Ze];
        return t;
      }
      function Hs(t, e) {
        return Ie(e[t]);
      }
      function kt(t, e) {
        return Ie(e[t.index]);
      }
      function yp(t, e) {
        return t.data[e];
      }
      function Lt(t, e) {
        const n = e[t];
        return qt(n) ? n : n[Ze];
      }
      function js(t) {
        return 128 == (128 & t[K]);
      }
      function Dr(t, e) {
        return null == e ? null : t[e];
      }
      function _p(t) {
        t[pi] = 0;
      }
      function cM(t) {
        1024 & t[K] || ((t[K] |= 1024), Dp(t, 1));
      }
      function vp(t) {
        1024 & t[K] && ((t[K] &= -1025), Dp(t, -1));
      }
      function Dp(t, e) {
        let n = t[Oe];
        if (null === n) return;
        n[Pr] += e;
        let r = n;
        for (
          n = n[Oe];
          null !== n && ((1 === e && 1 === r[Pr]) || (-1 === e && 0 === r[Pr]));

        )
          (n[Pr] += e), (r = n), (n = n[Oe]);
      }
      const V = {
        lFrame: Fp(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function wp() {
        return V.bindingsEnabled;
      }
      function yi() {
        return null !== V.skipHydrationRootTNode;
      }
      function D() {
        return V.lFrame.lView;
      }
      function oe() {
        return V.lFrame.tView;
      }
      function st() {
        let t = Cp();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Cp() {
        return V.lFrame.currentTNode;
      }
      function xn(t, e) {
        const n = V.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function vu() {
        return V.lFrame.isParent;
      }
      function Du() {
        V.lFrame.isParent = !1;
      }
      function _i() {
        return V.lFrame.bindingIndex++;
      }
      function tr(t) {
        const e = V.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function CM(t, e) {
        const n = V.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), Eu(e);
      }
      function Eu(t) {
        V.lFrame.currentDirectiveIndex = t;
      }
      function wu(t) {
        V.lFrame.currentQueryIndex = t;
      }
      function SM(t) {
        const e = t[w];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[ft] : null;
      }
      function Ap(t, e, n) {
        if (n & H.SkipSelf) {
          let i = e,
            o = t;
          for (
            ;
            !((i = i.parent),
            null !== i ||
              n & H.Host ||
              ((i = SM(o)), null === i || ((o = o[hi]), 10 & i.type)));

          );
          if (null === i) return !1;
          (e = i), (t = o);
        }
        const r = (V.lFrame = Np());
        return (r.currentTNode = e), (r.lView = t), !0;
      }
      function Cu(t) {
        const e = Np(),
          n = t[w];
        (V.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Np() {
        const t = V.lFrame,
          e = null === t ? null : t.child;
        return null === e ? Fp(t) : e;
      }
      function Fp(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1,
        };
        return null !== t && (t.child = e), e;
      }
      function Op() {
        const t = V.lFrame;
        return (
          (V.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const xp = Op;
      function Mu() {
        const t = Op();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function St() {
        return V.lFrame.selectedIndex;
      }
      function Br(t) {
        V.lFrame.selectedIndex = t;
      }
      function xe() {
        const t = V.lFrame;
        return yp(t.tView, t.selectedIndex);
      }
      let Pp = !0;
      function Us() {
        return Pp;
      }
      function Er(t) {
        Pp = t;
      }
      function $s(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const o = t.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: l,
              ngAfterViewChecked: u,
              ngOnDestroy: c,
            } = o;
          s && (t.contentHooks ??= []).push(-n, s),
            a &&
              ((t.contentHooks ??= []).push(n, a),
              (t.contentCheckHooks ??= []).push(n, a)),
            l && (t.viewHooks ??= []).push(-n, l),
            u &&
              ((t.viewHooks ??= []).push(n, u),
              (t.viewCheckHooks ??= []).push(n, u)),
            null != c && (t.destroyHooks ??= []).push(n, c);
        }
      }
      function zs(t, e, n) {
        kp(t, e, 3, n);
      }
      function Gs(t, e, n, r) {
        (3 & t[K]) === n && kp(t, e, n, r);
      }
      function Su(t, e) {
        let n = t[K];
        (3 & n) === e && ((n &= 4095), (n += 1), (t[K] = n));
      }
      function kp(t, e, n, r) {
        const o = r ?? -1,
          s = e.length - 1;
        let a = 0;
        for (let l = void 0 !== r ? 65535 & t[pi] : 0; l < s; l++)
          if ("number" == typeof e[l + 1]) {
            if (((a = e[l]), null != r && a >= r)) break;
          } else
            e[l] < 0 && (t[pi] += 65536),
              (a < o || -1 == o) &&
                (RM(t, n, e, l), (t[pi] = (4294901760 & t[pi]) + l + 2)),
              l++;
      }
      function Lp(t, e) {
        On(4, t, e);
        const n = nt(null);
        try {
          e.call(t);
        } finally {
          nt(n), On(5, t, e);
        }
      }
      function RM(t, e, n, r) {
        const i = n[r] < 0,
          o = n[r + 1],
          a = t[i ? -n[r] : n[r]];
        i
          ? t[K] >> 12 < t[pi] >> 16 &&
            (3 & t[K]) === e &&
            ((t[K] += 4096), Lp(a, o))
          : Lp(a, o);
      }
      const vi = -1;
      class _o {
        constructor(e, n, r) {
          (this.factory = e),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Vp(t) {
        return t !== vi;
      }
      function qs(t) {
        return 32767 & t;
      }
      function Ws(t, e) {
        let n = (function VM(t) {
            return t >> 16;
          })(t),
          r = e;
        for (; n > 0; ) (r = r[hi]), n--;
        return r;
      }
      let Tu = !0;
      function Ks(t) {
        const e = Tu;
        return (Tu = t), e;
      }
      const Bp = 255,
        Hp = 5;
      let BM = 0;
      const Rn = {};
      function Zs(t, e) {
        const n = jp(t, e);
        if (-1 !== n) return n;
        const r = e[w];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Au(r.data, t),
          Au(e, null),
          Au(r.blueprint, null));
        const i = Nu(t, e),
          o = t.injectorIndex;
        if (Vp(i)) {
          const s = qs(i),
            a = Ws(i, e),
            l = a[w].data;
          for (let u = 0; u < 8; u++) e[o + u] = a[s + u] | l[s + u];
        }
        return (e[o + 8] = i), o;
      }
      function Au(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function jp(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Nu(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          r = null,
          i = e;
        for (; null !== i; ) {
          if (((r = Kp(i)), null === r)) return vi;
          if ((n++, (i = i[hi]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return vi;
      }
      function Fu(t, e, n) {
        !(function HM(t, e, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(uo) && (r = n[uo]),
            null == r && (r = n[uo] = BM++);
          const i = r & Bp;
          e.data[t + (i >> Hp)] |= 1 << i;
        })(t, e, n);
      }
      function Up(t, e, n) {
        if (n & H.Optional || void 0 !== t) return t;
        Ss();
      }
      function $p(t, e, n, r) {
        if (
          (n & H.Optional && void 0 === r && (r = null),
          !(n & (H.Self | H.Host)))
        ) {
          const i = t[fi],
            o = Ft(void 0);
          try {
            return i ? i.get(e, r, n & H.Optional) : Bh(e, r, n & H.Optional);
          } finally {
            Ft(o);
          }
        }
        return Up(r, 0, n);
      }
      function zp(t, e, n, r = H.Default, i) {
        if (null !== t) {
          if (2048 & e[K] && !(r & H.Self)) {
            const s = (function GM(t, e, n, r, i) {
              let o = t,
                s = e;
              for (
                ;
                null !== o && null !== s && 2048 & s[K] && !(512 & s[K]);

              ) {
                const a = Gp(o, s, n, r | H.Self, Rn);
                if (a !== Rn) return a;
                let l = o.parent;
                if (!l) {
                  const u = s[np];
                  if (u) {
                    const c = u.get(n, Rn, r);
                    if (c !== Rn) return c;
                  }
                  (l = Kp(s)), (s = s[hi]);
                }
                o = l;
              }
              return i;
            })(t, e, n, r, Rn);
            if (s !== Rn) return s;
          }
          const o = Gp(t, e, n, r, Rn);
          if (o !== Rn) return o;
        }
        return $p(e, n, r, i);
      }
      function Gp(t, e, n, r, i) {
        const o = (function $M(t) {
          if ("string" == typeof t) return t.charCodeAt(0) || 0;
          const e = t.hasOwnProperty(uo) ? t[uo] : void 0;
          return "number" == typeof e ? (e >= 0 ? e & Bp : zM) : e;
        })(n);
        if ("function" == typeof o) {
          if (!Ap(e, t, r)) return r & H.Host ? Up(i, 0, r) : $p(e, n, r, i);
          try {
            const s = o(r);
            if (null != s || r & H.Optional) return s;
            Ss();
          } finally {
            xp();
          }
        } else if ("number" == typeof o) {
          let s = null,
            a = jp(t, e),
            l = vi,
            u = r & H.Host ? e[ze][ft] : null;
          for (
            (-1 === a || r & H.SkipSelf) &&
            ((l = -1 === a ? Nu(t, e) : e[a + 8]),
            l !== vi && Wp(r, !1)
              ? ((s = e[w]), (a = qs(l)), (e = Ws(l, e)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = e[w];
            if (qp(o, a, c.data)) {
              const d = UM(a, e, n, s, r, u);
              if (d !== Rn) return d;
            }
            (l = e[a + 8]),
              l !== vi && Wp(r, e[w].data[a + 8] === u) && qp(o, a, e)
                ? ((s = c), (a = qs(l)), (e = Ws(l, e)))
                : (a = -1);
          }
        }
        return i;
      }
      function UM(t, e, n, r, i, o) {
        const s = e[w],
          a = s.data[t + 8],
          c = (function Qs(t, e, n, r, i) {
            const o = t.providerIndexes,
              s = e.data,
              a = 1048575 & o,
              l = t.directiveStart,
              c = o >> 20,
              f = i ? a + c : t.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < l && n === p) || (h >= l && p.type === n)) return h;
            }
            if (i) {
              const h = s[l];
              if (h && yn(h) && h.type === n) return l;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? Lr(a) && Tu : r != s && 0 != (3 & a.type),
            i & H.Host && o === a
          );
        return null !== c ? Hr(e, s, c, a) : Rn;
      }
      function Hr(t, e, n, r) {
        let i = t[n];
        const o = e.data;
        if (
          (function PM(t) {
            return t instanceof _o;
          })(i)
        ) {
          const s = i;
          s.resolving &&
            (function fC(t, e) {
              const n = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
              throw new _(
                -200,
                `Circular dependency in DI detected for ${t}${n}`
              );
            })(
              (function he(t) {
                return "function" == typeof t
                  ? t.name || t.toString()
                  : "object" == typeof t &&
                    null != t &&
                    "function" == typeof t.type
                  ? t.type.name || t.type.toString()
                  : $(t);
              })(o[n])
            );
          const a = Ks(s.canSeeViewProviders);
          s.resolving = !0;
          const l = s.injectImpl ? Ft(s.injectImpl) : null;
          Ap(t, r, H.Default);
          try {
            (i = t[n] = s.factory(void 0, o, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function xM(t, e, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: i,
                    ngDoCheck: o,
                  } = e.type.prototype;
                  if (r) {
                    const s = fp(e);
                    (n.preOrderHooks ??= []).push(t, s),
                      (n.preOrderCheckHooks ??= []).push(t, s);
                  }
                  i && (n.preOrderHooks ??= []).push(0 - t, i),
                    o &&
                      ((n.preOrderHooks ??= []).push(t, o),
                      (n.preOrderCheckHooks ??= []).push(t, o));
                })(n, o[n], e);
          } finally {
            null !== l && Ft(l), Ks(a), (s.resolving = !1), xp();
          }
        }
        return i;
      }
      function qp(t, e, n) {
        return !!(n[e + (t >> Hp)] & (1 << t));
      }
      function Wp(t, e) {
        return !(t & H.Self || (t & H.Host && e));
      }
      class Di {
        constructor(e, n) {
          (this._tNode = e), (this._lView = n);
        }
        get(e, n, r) {
          return zp(this._tNode, this._lView, e, Ns(r), n);
        }
      }
      function zM() {
        return new Di(st(), D());
      }
      function Kp(t) {
        const e = t[w],
          n = e.type;
        return 2 === n ? e.declTNode : 1 === n ? t[ft] : null;
      }
      const bi = "__parameters__";
      function Ci(t, e, n) {
        return Zn(() => {
          const r = (function xu(t) {
            return function (...n) {
              if (t) {
                const r = t(...n);
                for (const i in r) this[i] = r[i];
              }
            };
          })(e);
          function i(...o) {
            if (this instanceof i) return r.apply(this, o), this;
            const s = new i(...o);
            return (a.annotation = s), a;
            function a(l, u, c) {
              const d = l.hasOwnProperty(bi)
                ? l[bi]
                : Object.defineProperty(l, bi, { value: [] })[bi];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), l;
            }
          }
          return (
            n && (i.prototype = Object.create(n.prototype)),
            (i.prototype.ngMetadataName = t),
            (i.annotationCls = i),
            i
          );
        });
      }
      function Eo(t, e) {
        t.forEach((n) => (Array.isArray(n) ? Eo(n, e) : e(n)));
      }
      function Qp(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function Xs(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function bo(t, e) {
        const n = [];
        for (let r = 0; r < t; r++) n.push(e);
        return n;
      }
      function Wt(t, e, n) {
        let r = Mi(t, e);
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function QM(t, e, n, r) {
                let i = t.length;
                if (i == e) t.push(n, r);
                else if (1 === i) t.push(r, t[0]), (t[0] = n);
                else {
                  for (i--, t.push(t[i - 1], t[i]); i > e; )
                    (t[i] = t[i - 2]), i--;
                  (t[e] = n), (t[e + 1] = r);
                }
              })(t, r, e, n)),
          r
        );
      }
      function Ru(t, e) {
        const n = Mi(t, e);
        if (n >= 0) return t[1 | n];
      }
      function Mi(t, e) {
        return (function Yp(t, e, n) {
          let r = 0,
            i = t.length >> n;
          for (; i !== r; ) {
            const o = r + ((i - r) >> 1),
              s = t[o << n];
            if (e === s) return o << n;
            s > e ? (i = o) : (r = o + 1);
          }
          return ~(i << n);
        })(t, e, 1);
      }
      const Si = lo(Ci("Optional"), 8),
        ea = lo(Ci("SkipSelf"), 4);
      function ia(t) {
        return 128 == (128 & t.flags);
      }
      var Vt = (() => (
        ((Vt = Vt || {})[(Vt.Important = 1)] = "Important"),
        (Vt[(Vt.DashCase = 2)] = "DashCase"),
        Vt
      ))();
      const Hu = new Map();
      let DS = 0;
      const Uu = "__ngContext__";
      function pt(t, e) {
        qt(e)
          ? ((t[Uu] = e[mo]),
            (function bS(t) {
              Hu.set(t[mo], t);
            })(e))
          : (t[Uu] = e);
      }
      let $u;
      function zu(t, e) {
        return $u(t, e);
      }
      function Mo(t) {
        const e = t[Oe];
        return Pt(e) ? e[Oe] : e;
      }
      function Gu(t) {
        return gm(t[ho]);
      }
      function qu(t) {
        return gm(t[gn]);
      }
      function gm(t) {
        for (; null !== t && !Pt(t); ) t = t[gn];
        return t;
      }
      function Ai(t, e, n, r, i) {
        if (null != r) {
          let o,
            s = !1;
          Pt(r) ? (o = r) : qt(r) && ((s = !0), (r = r[Ze]));
          const a = Ie(r);
          0 === t && null !== n
            ? null == i
              ? Em(e, n, a)
              : jr(e, n, a, i || null, !0)
            : 1 === t && null !== n
            ? jr(e, n, a, i || null, !0)
            : 2 === t
            ? (function ca(t, e, n) {
                const r = la(t, e);
                r &&
                  (function jS(t, e, n, r) {
                    t.removeChild(e, n, r);
                  })(t, r, e, n);
              })(e, a, s)
            : 3 === t && e.destroyNode(a),
            null != o &&
              (function zS(t, e, n, r, i) {
                const o = n[Nn];
                o !== Ie(n) && Ai(e, t, r, o, i);
                for (let a = ot; a < n.length; a++) {
                  const l = n[a];
                  Io(l[w], l, t, e, r, o);
                }
              })(e, t, o, n, i);
        }
      }
      function aa(t, e, n) {
        return t.createElement(e, n);
      }
      function _m(t, e) {
        const n = t[mi],
          r = n.indexOf(e);
        vp(e), n.splice(r, 1);
      }
      function Ku(t, e) {
        if (t.length <= ot) return;
        const n = ot + e,
          r = t[n];
        if (r) {
          const i = r[po];
          null !== i && i !== t && _m(i, r), e > 0 && (t[n - 1][gn] = r[gn]);
          const o = Xs(t, ot + e);
          !(function xS(t, e) {
            Io(t, e, e[q], 2, null, null), (e[Ze] = null), (e[ft] = null);
          })(r[w], r);
          const s = o[An];
          null !== s && s.detachView(o[w]),
            (r[Oe] = null),
            (r[gn] = null),
            (r[K] &= -129);
        }
        return r;
      }
      function vm(t, e) {
        if (!(256 & e[K])) {
          const n = e[q];
          e[xs]?.destroy(),
            e[Rs]?.destroy(),
            n.destroyNode && Io(t, e, n, 3, null, null),
            (function kS(t) {
              let e = t[ho];
              if (!e) return Zu(t[w], t);
              for (; e; ) {
                let n = null;
                if (qt(e)) n = e[ho];
                else {
                  const r = e[ot];
                  r && (n = r);
                }
                if (!n) {
                  for (; e && !e[gn] && e !== t; )
                    qt(e) && Zu(e[w], e), (e = e[Oe]);
                  null === e && (e = t), qt(e) && Zu(e[w], e), (n = e && e[gn]);
                }
                e = n;
              }
            })(e);
        }
      }
      function Zu(t, e) {
        if (!(256 & e[K])) {
          (e[K] &= -129),
            (e[K] |= 256),
            (function HS(t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const i = e[n[r]];
                  if (!(i instanceof _o)) {
                    const o = n[r + 1];
                    if (Array.isArray(o))
                      for (let s = 0; s < o.length; s += 2) {
                        const a = i[o[s]],
                          l = o[s + 1];
                        On(4, a, l);
                        try {
                          l.call(a);
                        } finally {
                          On(5, a, l);
                        }
                      }
                    else {
                      On(4, i, o);
                      try {
                        o.call(i);
                      } finally {
                        On(5, i, o);
                      }
                    }
                  }
                }
            })(t, e),
            (function BS(t, e) {
              const n = t.cleanup,
                r = e[di];
              if (null !== n)
                for (let o = 0; o < n.length - 1; o += 2)
                  if ("string" == typeof n[o]) {
                    const s = n[o + 3];
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (o += 2);
                  } else n[o].call(r[n[o + 1]]);
              null !== r && (e[di] = null);
              const i = e[vr];
              if (null !== i) {
                e[vr] = null;
                for (let o = 0; o < i.length; o++) (0, i[o])();
              }
            })(t, e),
            1 === e[w].type && e[q].destroy();
          const n = e[po];
          if (null !== n && Pt(e[Oe])) {
            n !== e[Oe] && _m(n, e);
            const r = e[An];
            null !== r && r.detachView(t);
          }
          !(function wS(t) {
            Hu.delete(t[mo]);
          })(e);
        }
      }
      function Qu(t, e, n) {
        return (function Dm(t, e, n) {
          let r = e;
          for (; null !== r && 40 & r.type; ) r = (e = r).parent;
          if (null === r) return n[Ze];
          {
            const { componentOffset: i } = r;
            if (i > -1) {
              const { encapsulation: o } = t.data[r.directiveStart + i];
              if (o === Ot.None || o === Ot.Emulated) return null;
            }
            return kt(r, n);
          }
        })(t, e.parent, n);
      }
      function jr(t, e, n, r, i) {
        t.insertBefore(e, n, r, i);
      }
      function Em(t, e, n) {
        t.appendChild(e, n);
      }
      function bm(t, e, n, r, i) {
        null !== r ? jr(t, e, n, r, i) : Em(t, e, n);
      }
      function la(t, e) {
        return t.parentNode(e);
      }
      function wm(t, e, n) {
        return Mm(t, e, n);
      }
      let Yu,
        da,
        tc,
        Mm = function Cm(t, e, n) {
          return 40 & t.type ? kt(t, n) : null;
        };
      function ua(t, e, n, r) {
        const i = Qu(t, r, e),
          o = e[q],
          a = wm(r.parent || e[ft], r, e);
        if (null != i)
          if (Array.isArray(n))
            for (let l = 0; l < n.length; l++) bm(o, i, n[l], a, !1);
          else bm(o, i, n, a, !1);
        void 0 !== Yu && Yu(o, r, e, n, i);
      }
      function So(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return kt(e, t);
          if (4 & n) return Xu(-1, t[e.index]);
          if (8 & n) {
            const r = e.child;
            if (null !== r) return So(t, r);
            {
              const i = t[e.index];
              return Pt(i) ? Xu(-1, i) : Ie(i);
            }
          }
          if (32 & n) return zu(e, t)() || Ie(t[e.index]);
          {
            const r = Im(t, e);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : So(Mo(t[ze]), r)
              : So(t, e.next);
          }
        }
        return null;
      }
      function Im(t, e) {
        return null !== e ? t[ze][ft].projection[e.projection] : null;
      }
      function Xu(t, e) {
        const n = ot + t + 1;
        if (n < e.length) {
          const r = e[n],
            i = r[w].firstChild;
          if (null !== i) return So(r, i);
        }
        return e[Nn];
      }
      function Ju(t, e, n, r, i, o, s) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          if (
            (s && 0 === e && (a && pt(Ie(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & l) Ju(t, e, n.child, r, i, o, !1), Ai(e, t, i, a, o);
            else if (32 & l) {
              const u = zu(n, r);
              let c;
              for (; (c = u()); ) Ai(e, t, i, c, o);
              Ai(e, t, i, a, o);
            } else 16 & l ? Am(t, e, r, n, i, o) : Ai(e, t, i, a, o);
          n = s ? n.projectionNext : n.next;
        }
      }
      function Io(t, e, n, r, i, o) {
        Ju(n, r, t.firstChild, e, i, o, !1);
      }
      function Am(t, e, n, r, i, o) {
        const s = n[ze],
          l = s[ft].projection[r.projection];
        if (Array.isArray(l))
          for (let u = 0; u < l.length; u++) Ai(e, t, i, l[u], o);
        else {
          let u = l;
          const c = s[Oe];
          ia(r) && (u.flags |= 128), Ju(t, e, u, c, i, o, !0);
        }
      }
      function Nm(t, e, n) {
        "" === n
          ? t.removeAttribute(e, "class")
          : t.setAttribute(e, "class", n);
      }
      function Fm(t, e, n) {
        const { mergedAttrs: r, classes: i, styles: o } = n;
        null !== r && cu(t, e, r),
          null !== i && Nm(t, e, i),
          null !== o &&
            (function qS(t, e, n) {
              t.setAttribute(e, "style", n);
            })(t, e, o);
      }
      function Ni(t) {
        return (
          (function ec() {
            if (void 0 === da && ((da = null), Ce.trustedTypes))
              try {
                da = Ce.trustedTypes.createPolicy("angular", {
                  createHTML: (t) => t,
                  createScript: (t) => t,
                  createScriptURL: (t) => t,
                });
              } catch {}
            return da;
          })()?.createHTML(t) || t
        );
      }
      class Ur {
        constructor(e) {
          this.changingThisBreaksApplicationSecurity = e;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Rh})`;
        }
      }
      class YS extends Ur {
        getTypeName() {
          return "HTML";
        }
      }
      class XS extends Ur {
        getTypeName() {
          return "Style";
        }
      }
      class JS extends Ur {
        getTypeName() {
          return "Script";
        }
      }
      class e0 extends Ur {
        getTypeName() {
          return "URL";
        }
      }
      class t0 extends Ur {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function Kt(t) {
        return t instanceof Ur ? t.changingThisBreaksApplicationSecurity : t;
      }
      function Pn(t, e) {
        const n = (function n0(t) {
          return (t instanceof Ur && t.getTypeName()) || null;
        })(t);
        if (null != n && n !== e) {
          if ("ResourceURL" === n && "URL" === e) return !0;
          throw new Error(`Required a safe ${e}, got a ${n} (see ${Rh})`);
        }
        return n === e;
      }
      class u0 {
        constructor(e) {
          this.inertDocumentHelper = e;
        }
        getInertBodyElement(e) {
          e = "<body><remove></remove>" + e;
          try {
            const n = new window.DOMParser().parseFromString(
              Ni(e),
              "text/html"
            ).body;
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(e)
              : (n.removeChild(n.firstChild), n);
          } catch {
            return null;
          }
        }
      }
      class c0 {
        constructor(e) {
          (this.defaultDoc = e),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                "sanitization-inert"
              ));
        }
        getInertBodyElement(e) {
          const n = this.inertDocument.createElement("template");
          return (n.innerHTML = Ni(e)), n;
        }
      }
      const f0 = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      function ha(t) {
        return (t = String(t)).match(f0) ? t : "unsafe:" + t;
      }
      function nr(t) {
        const e = {};
        for (const n of t.split(",")) e[n] = !0;
        return e;
      }
      function Ao(...t) {
        const e = {};
        for (const n of t)
          for (const r in n) n.hasOwnProperty(r) && (e[r] = !0);
        return e;
      }
      const km = nr("area,br,col,hr,img,wbr"),
        Lm = nr("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Vm = nr("rp,rt"),
        rc = Ao(
          km,
          Ao(
            Lm,
            nr(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          Ao(
            Vm,
            nr(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Ao(Vm, Lm)
        ),
        ic = nr("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Bm = Ao(
          ic,
          nr(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          nr(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        h0 = nr("script,style,template");
      class p0 {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(e) {
          let n = e.firstChild,
            r = !0;
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild;
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
                let i = this.checkClobberedElement(n, n.nextSibling);
                if (i) {
                  n = i;
                  break;
                }
                n = this.checkClobberedElement(n, n.parentNode);
              }
          return this.buf.join("");
        }
        startElement(e) {
          const n = e.nodeName.toLowerCase();
          if (!rc.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !h0.hasOwnProperty(n);
          this.buf.push("<"), this.buf.push(n);
          const r = e.attributes;
          for (let i = 0; i < r.length; i++) {
            const o = r.item(i),
              s = o.name,
              a = s.toLowerCase();
            if (!Bm.hasOwnProperty(a)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let l = o.value;
            ic[a] && (l = ha(l)), this.buf.push(" ", s, '="', Hm(l), '"');
          }
          return this.buf.push(">"), !0;
        }
        endElement(e) {
          const n = e.nodeName.toLowerCase();
          rc.hasOwnProperty(n) &&
            !km.hasOwnProperty(n) &&
            (this.buf.push("</"), this.buf.push(n), this.buf.push(">"));
        }
        chars(e) {
          this.buf.push(Hm(e));
        }
        checkClobberedElement(e, n) {
          if (
            n &&
            (e.compareDocumentPosition(n) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${e.outerHTML}`
            );
          return n;
        }
      }
      const m0 = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        g0 = /([^\#-~ |!])/g;
      function Hm(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(m0, function (e) {
            return (
              "&#" +
              (1024 * (e.charCodeAt(0) - 55296) +
                (e.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(g0, function (e) {
            return "&#" + e.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let pa;
      function jm(t, e) {
        let n = null;
        try {
          pa =
            pa ||
            (function Pm(t) {
              const e = new c0(t);
              return (function d0() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    Ni(""),
                    "text/html"
                  );
                } catch {
                  return !1;
                }
              })()
                ? new u0(e)
                : e;
            })(t);
          let r = e ? String(e) : "";
          n = pa.getInertBodyElement(r);
          let i = 5,
            o = r;
          do {
            if (0 === i)
              throw new Error(
                "Failed to sanitize html because the input is unstable"
              );
            i--, (r = o), (o = n.innerHTML), (n = pa.getInertBodyElement(r));
          } while (r !== o);
          return Ni(new p0().sanitizeChildren(oc(n) || n));
        } finally {
          if (n) {
            const r = oc(n) || n;
            for (; r.firstChild; ) r.removeChild(r.firstChild);
          }
        }
      }
      function oc(t) {
        return "content" in t &&
          (function y0(t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      var ce = (() => (
        ((ce = ce || {})[(ce.NONE = 0)] = "NONE"),
        (ce[(ce.HTML = 1)] = "HTML"),
        (ce[(ce.STYLE = 2)] = "STYLE"),
        (ce[(ce.SCRIPT = 3)] = "SCRIPT"),
        (ce[(ce.URL = 4)] = "URL"),
        (ce[(ce.RESOURCE_URL = 5)] = "RESOURCE_URL"),
        ce
      ))();
      class C {
        constructor(e, n) {
          (this._desc = e),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = ee({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const ma = new C("ENVIRONMENT_INITIALIZER"),
        zm = new C("INJECTOR", -1),
        Gm = new C("INJECTOR_DEF_TYPES");
      class qm {
        get(e, n = ao) {
          if (n === ao) {
            const r = new Error(`NullInjectorError: No provider for ${Ke(e)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function M0(...t) {
        return { ɵproviders: Km(0, t), ɵfromNgModule: !0 };
      }
      function Km(t, ...e) {
        const n = [],
          r = new Set();
        let i;
        return (
          Eo(e, (o) => {
            const s = o;
            sc(s, n, [], r) && ((i ||= []), i.push(s));
          }),
          void 0 !== i && Zm(i, n),
          n
        );
      }
      function Zm(t, e) {
        for (let n = 0; n < t.length; n++) {
          const { providers: i } = t[n];
          ac(i, (o) => {
            e.push(o);
          });
        }
      }
      function sc(t, e, n, r) {
        if (!(t = j(t))) return !1;
        let i = null,
          o = kh(t);
        const s = !o && ue(t);
        if (o || s) {
          if (s && !s.standalone) return !1;
          i = t;
        } else {
          const l = t.ngModule;
          if (((o = kh(l)), !o)) return !1;
          i = l;
        }
        const a = r.has(i);
        if (s) {
          if (a) return !1;
          if ((r.add(i), s.dependencies)) {
            const l =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const u of l) sc(u, e, n, r);
          }
        } else {
          if (!o) return !1;
          {
            if (null != o.imports && !a) {
              let u;
              r.add(i);
              try {
                Eo(o.imports, (c) => {
                  sc(c, e, n, r) && ((u ||= []), u.push(c));
                });
              } finally {
              }
              void 0 !== u && Zm(u, e);
            }
            if (!a) {
              const u = Vr(i) || (() => new i());
              e.push(
                { provide: i, useFactory: u, deps: le },
                { provide: Gm, useValue: i, multi: !0 },
                { provide: ma, useValue: () => F(i), multi: !0 }
              );
            }
            const l = o.providers;
            null == l ||
              a ||
              ac(l, (c) => {
                e.push(c);
              });
          }
        }
        return i !== t && void 0 !== t.providers;
      }
      function ac(t, e) {
        for (let n of t)
          ru(n) && (n = n.ɵproviders), Array.isArray(n) ? ac(n, e) : e(n);
      }
      const S0 = _e({ provide: String, useValue: _e });
      function lc(t) {
        return null !== t && "object" == typeof t && S0 in t;
      }
      function $r(t) {
        return "function" == typeof t;
      }
      const uc = new C("Set Injector scope."),
        ga = {},
        T0 = {};
      let cc;
      function ya() {
        return void 0 === cc && (cc = new qm()), cc;
      }
      class Fi {}
      class dc extends Fi {
        get destroyed() {
          return this._destroyed;
        }
        constructor(e, n, r, i) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = i),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            hc(e, (s) => this.processProvider(s)),
            this.records.set(zm, Oi(void 0, this)),
            i.has("environment") && this.records.set(Fi, Oi(void 0, this));
          const o = this.records.get(uc);
          null != o && "string" == typeof o.value && this.scopes.add(o.value),
            (this.injectorDefTypes = new Set(this.get(Gm.multi, le, H.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const e = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of e) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(e) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(e),
            () => this.removeOnDestroy(e)
          );
        }
        runInContext(e) {
          this.assertNotDestroyed();
          const n = _r(this),
            r = Ft(void 0);
          try {
            return e();
          } finally {
            _r(n), Ft(r);
          }
        }
        get(e, n = ao, r = H.Default) {
          if ((this.assertNotDestroyed(), e.hasOwnProperty($h)))
            return e[$h](this);
          r = Ns(r);
          const i = _r(this),
            o = Ft(void 0);
          try {
            if (!(r & H.SkipSelf)) {
              let a = this.records.get(e);
              if (void 0 === a) {
                const l =
                  (function x0(t) {
                    return (
                      "function" == typeof t ||
                      ("object" == typeof t && t instanceof C)
                    );
                  })(e) && Is(e);
                (a = l && this.injectableDefInScope(l) ? Oi(fc(e), ga) : null),
                  this.records.set(e, a);
              }
              if (null != a) return this.hydrate(e, a);
            }
            return (r & H.Self ? ya() : this.parent).get(
              e,
              (n = r & H.Optional && n === ao ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[As] = s[As] || []).unshift(Ke(e)), i)) throw s;
              return (function MC(t, e, n, r) {
                const i = t[As];
                throw (
                  (e[Hh] && i.unshift(e[Hh]),
                  (t.message = (function SC(t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.slice(2)
                        : t;
                    let i = Ke(e);
                    if (Array.isArray(e)) i = e.map(Ke).join(" -> ");
                    else if ("object" == typeof e) {
                      let o = [];
                      for (let s in e)
                        if (e.hasOwnProperty(s)) {
                          let a = e[s];
                          o.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : Ke(a))
                          );
                        }
                      i = `{${o.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${i}]: ${t.replace(
                      DC,
                      "\n  "
                    )}`;
                  })("\n" + t.message, i, n, r)),
                  (t.ngTokenPath = i),
                  (t[As] = null),
                  t)
                );
              })(s, e, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Ft(o), _r(i);
          }
        }
        resolveInjectorInitializers() {
          const e = _r(this),
            n = Ft(void 0);
          try {
            const r = this.get(ma.multi, le, H.Self);
            for (const i of r) i();
          } finally {
            _r(e), Ft(n);
          }
        }
        toString() {
          const e = [],
            n = this.records;
          for (const r of n.keys()) e.push(Ke(r));
          return `R3Injector[${e.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new _(205, !1);
        }
        processProvider(e) {
          let n = $r((e = j(e))) ? e : j(e && e.provide);
          const r = (function N0(t) {
            return lc(t)
              ? Oi(void 0, t.useValue)
              : Oi(
                  (function Xm(t, e, n) {
                    let r;
                    if ($r(t)) {
                      const i = j(t);
                      return Vr(i) || fc(i);
                    }
                    if (lc(t)) r = () => j(t.useValue);
                    else if (
                      (function Ym(t) {
                        return !(!t || !t.useFactory);
                      })(t)
                    )
                      r = () => t.useFactory(...au(t.deps || []));
                    else if (
                      (function Qm(t) {
                        return !(!t || !t.useExisting);
                      })(t)
                    )
                      r = () => F(j(t.useExisting));
                    else {
                      const i = j(t && (t.useClass || t.provide));
                      if (
                        !(function F0(t) {
                          return !!t.deps;
                        })(t)
                      )
                        return Vr(i) || fc(i);
                      r = () => new i(...au(t.deps));
                    }
                    return r;
                  })(t),
                  ga
                );
          })(e);
          if ($r(e) || !0 !== e.multi) this.records.get(n);
          else {
            let i = this.records.get(n);
            i ||
              ((i = Oi(void 0, ga, !0)),
              (i.factory = () => au(i.multi)),
              this.records.set(n, i)),
              (n = e),
              i.multi.push(e);
          }
          this.records.set(n, r);
        }
        hydrate(e, n) {
          return (
            n.value === ga && ((n.value = T0), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function O0(t) {
                return (
                  null !== t &&
                  "object" == typeof t &&
                  "function" == typeof t.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(e) {
          if (!e.providedIn) return !1;
          const n = j(e.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(e) {
          const n = this._onDestroyHooks.indexOf(e);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function fc(t) {
        const e = Is(t),
          n = null !== e ? e.factory : Vr(t);
        if (null !== n) return n;
        if (t instanceof C) throw new _(204, !1);
        if (t instanceof Function)
          return (function A0(t) {
            const e = t.length;
            if (e > 0) throw (bo(e, "?"), new _(204, !1));
            const n = (function yC(t) {
              return (t && (t[Ts] || t[Lh])) || null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new _(204, !1);
      }
      function Oi(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function hc(t, e) {
        for (const n of t)
          Array.isArray(n) ? hc(n, e) : n && ru(n) ? hc(n.ɵproviders, e) : e(n);
      }
      const _a = new C("AppId", { providedIn: "root", factory: () => R0 }),
        R0 = "ng",
        Jm = new C("Platform Initializer"),
        zr = new C("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        eg = new C("AnimationModuleType"),
        pc = new C("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function To() {
              if (void 0 !== tc) return tc;
              if (typeof document < "u") return document;
              throw new _(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let ng = (t, e) => null;
      function rg(t, e) {
        return ng(t, e);
      }
      class $0 {}
      class sg {}
      class G0 {
        resolveComponentFactory(e) {
          throw (function z0(t) {
            const e = Error(`No component factory found for ${Ke(t)}.`);
            return (e.ngComponent = t), e;
          })(e);
        }
      }
      let wa = (() => {
        class t {}
        return (t.NULL = new G0()), t;
      })();
      function q0() {
        return xi(st(), D());
      }
      function xi(t, e) {
        return new Zt(kt(t, e));
      }
      let Zt = (() => {
        class t {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (t.__NG_ELEMENT_ID__ = q0), t;
      })();
      class Ro {}
      let Z0 = (() => {
        class t {}
        return (
          (t.ɵprov = ee({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class Ri {
        constructor(e) {
          (this.full = e),
            (this.major = e.split(".")[0]),
            (this.minor = e.split(".")[1]),
            (this.patch = e.split(".").slice(2).join("."));
        }
      }
      const Q0 = new Ri("16.0.5"),
        Mc = {};
      function Po(t) {
        for (; t; ) {
          t[K] |= 64;
          const e = Mo(t);
          if (hu(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function Sc(t) {
        return t.ngOriginalError;
      }
      class kn {
        constructor() {
          this._console = console;
        }
        handleError(e) {
          const n = this._findOriginalError(e);
          this._console.error("ERROR", e),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(e) {
          let n = e && Sc(e);
          for (; n && Sc(n); ) n = Sc(n);
          return n || null;
        }
      }
      const cg = new C("", { providedIn: "root", factory: () => !1 });
      function dg(t) {
        return t.ownerDocument.defaultView;
      }
      class gg extends lp {
        constructor() {
          super(...arguments),
            (this.consumerAllowSignalWrites = !1),
            (this._lView = null);
        }
        set lView(e) {
          this._lView = e;
        }
        onConsumerDependencyMayHaveChanged() {
          Po(this._lView);
        }
        onProducerUpdateValueVersion() {}
        get hasReadASignal() {
          return this.hasProducers;
        }
        runInContext(e, n, r) {
          const i = nt(this);
          this.trackingVersion++;
          try {
            e(n, r);
          } finally {
            nt(i);
          }
        }
        destroy() {
          this.trackingVersion++;
        }
      }
      let Ma = null;
      function yg() {
        return (Ma ??= new gg()), Ma;
      }
      function _g(t, e) {
        return t[e] ?? yg();
      }
      function vg(t, e) {
        const n = yg();
        n.hasReadASignal && ((t[e] = Ma), (n.lView = t), (Ma = new gg()));
      }
      const W = {};
      function qr(t) {
        Dg(oe(), D(), St() + t, !1);
      }
      function Dg(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[K])) {
            const o = t.preOrderCheckHooks;
            null !== o && zs(e, o, n);
          } else {
            const o = t.preOrderHooks;
            null !== o && Gs(e, o, 0, n);
          }
        Br(n);
      }
      function Cg(t, e = null, n = null, r) {
        const i = Mg(t, e, n, r);
        return i.resolveInjectorInitializers(), i;
      }
      function Mg(t, e = null, n = null, r, i = new Set()) {
        const o = [n || le, M0(t)];
        return (
          (r = r || ("object" == typeof t ? void 0 : Ke(t))),
          new dc(o, e || ya(), r || null, i)
        );
      }
      let ir = (() => {
        class t {
          static create(n, r) {
            if (Array.isArray(n)) return Cg({ name: "" }, r, n, "");
            {
              const i = n.name ?? "";
              return Cg({ name: i }, n.parent, n.providers, i);
            }
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = ao),
          (t.NULL = new qm()),
          (t.ɵprov = ee({ token: t, providedIn: "any", factory: () => F(zm) })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function E(t, e = H.Default) {
        const n = D();
        return null === n ? F(t, e) : zp(st(), n, j(t), e);
      }
      function Sa(t, e, n, r, i, o, s, a, l, u, c) {
        const d = e.blueprint.slice();
        return (
          (d[Ze] = i),
          (d[K] = 140 | r),
          (null !== u || (t && 2048 & t[K])) && (d[K] |= 2048),
          _p(d),
          (d[Oe] = d[hi] = t),
          (d[Le] = n),
          (d[kr] = s || (t && t[kr])),
          (d[q] = a || (t && t[q])),
          (d[fi] = l || (t && t[fi]) || null),
          (d[ft] = o),
          (d[mo] = (function ES() {
            return DS++;
          })()),
          (d[Xn] = c),
          (d[np] = u),
          (d[ze] = 2 == e.type ? t[ze] : d),
          d
        );
      }
      function ki(t, e, n, r, i) {
        let o = t.data[e];
        if (null === o)
          (o = (function Ic(t, e, n, r, i) {
            const o = Cp(),
              s = vu(),
              l = (t.data[e] = (function yI(t, e, n, r, i, o) {
                let s = e ? e.injectorIndex : -1,
                  a = 0;
                return (
                  yi() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: i,
                    attrs: o,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: e,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, s ? o : o && o.parent, n, e, r, i));
            return (
              null === t.firstChild && (t.firstChild = l),
              null !== o &&
                (s
                  ? null == o.child && null !== l.parent && (o.child = l)
                  : null === o.next && ((o.next = l), (l.prev = o))),
              l
            );
          })(t, e, n, r, i)),
            (function wM() {
              return V.lFrame.inI18n;
            })() && (o.flags |= 32);
        else if (64 & o.type) {
          (o.type = n), (o.value = r), (o.attrs = i);
          const s = (function yo() {
            const t = V.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          o.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return xn(o, !0), o;
      }
      function ko(t, e, n, r) {
        if (0 === n) return -1;
        const i = e.length;
        for (let o = 0; o < n; o++)
          e.push(r), t.blueprint.push(r), t.data.push(null);
        return i;
      }
      function Sg(t, e, n, r, i) {
        const o = _g(e, xs),
          s = St(),
          a = 2 & r;
        try {
          if (
            (Br(-1),
            a && e.length > ie && Dg(t, e, ie, !1),
            On(a ? 2 : 0, i),
            a)
          )
            o.runInContext(n, r, i);
          else {
            const u = nt(null);
            try {
              n(r, i);
            } finally {
              nt(u);
            }
          }
        } finally {
          a && null === e[xs] && vg(e, xs), Br(s), On(a ? 3 : 1, i);
        }
      }
      function Tc(t, e, n) {
        if (fu(e)) {
          const r = nt(null);
          try {
            const o = e.directiveEnd;
            for (let s = e.directiveStart; s < o; s++) {
              const a = t.data[s];
              a.contentQueries && a.contentQueries(1, n[s], s);
            }
          } finally {
            nt(r);
          }
        }
      }
      function Ac(t, e, n) {
        wp() &&
          ((function CI(t, e, n, r) {
            const i = n.directiveStart,
              o = n.directiveEnd;
            Lr(n) &&
              (function FI(t, e, n) {
                const r = kt(e, t),
                  s = Ia(
                    t,
                    Sa(
                      t,
                      Ig(n),
                      null,
                      n.onPush ? 64 : 16,
                      r,
                      e,
                      null,
                      t[kr].rendererFactory.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                t[e.index] = s;
              })(e, n, t.data[i + n.componentOffset]),
              t.firstCreatePass || Zs(n, e),
              pt(r, e);
            const s = n.initialInputs;
            for (let a = i; a < o; a++) {
              const l = t.data[a],
                u = Hr(e, t, a, n);
              pt(u, e),
                null !== s && OI(0, a - i, u, l, 0, s),
                yn(l) && (Lt(n.index, e)[Le] = Hr(e, t, a, n));
            }
          })(t, e, n, kt(n, e)),
          64 == (64 & n.flags) && Og(t, e, n));
      }
      function Nc(t, e, n = kt) {
        const r = e.localNames;
        if (null !== r) {
          let i = e.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const s = r[o + 1],
              a = -1 === s ? n(e, t) : t[s];
            t[i++] = a;
          }
        }
      }
      function Ig(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Fc(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts,
              t.id
            ))
          : e;
      }
      function Fc(t, e, n, r, i, o, s, a, l, u, c) {
        const d = ie + r,
          f = d + i,
          h = (function dI(t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : W);
            return n;
          })(d, f),
          p = "function" == typeof u ? u() : u;
        return (h[w] = {
          type: t,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: c,
        });
      }
      let Tg = (t) => null;
      function Ag(t, e, n, r) {
        for (let i in t)
          if (t.hasOwnProperty(i)) {
            n = null === n ? {} : n;
            const o = t[i];
            null === r
              ? Ng(n, e, i, o)
              : r.hasOwnProperty(i) && Ng(n, e, r[i], o);
          }
        return n;
      }
      function Ng(t, e, n, r) {
        t.hasOwnProperty(n) ? t[n].push(e, r) : (t[n] = [e, r]);
      }
      function Oc(t, e, n, r) {
        if (wp()) {
          const i = null === r ? null : { "": -1 },
            o = (function SI(t, e) {
              const n = t.directiveRegistry;
              let r = null,
                i = null;
              if (n)
                for (let o = 0; o < n.length; o++) {
                  const s = n[o];
                  if (Qh(e, s.selectors, !1))
                    if ((r || (r = []), yn(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (i = i || new Map()),
                          s.findHostDirectiveDefs(s, a, i),
                          r.unshift(...a, s),
                          xc(t, e, a.length);
                      } else r.unshift(s), xc(t, e, 0);
                    else
                      (i = i || new Map()),
                        s.findHostDirectiveDefs?.(s, r, i),
                        r.push(s);
                }
              return null === r ? null : [r, i];
            })(t, n);
          let s, a;
          null === o ? (s = a = null) : ([s, a] = o),
            null !== s && Fg(t, e, n, s, i, a),
            i &&
              (function II(t, e, n) {
                if (e) {
                  const r = (t.localNames = []);
                  for (let i = 0; i < e.length; i += 2) {
                    const o = n[e[i + 1]];
                    if (null == o) throw new _(-301, !1);
                    r.push(e[i], o);
                  }
                }
              })(n, r, i);
        }
        n.mergedAttrs = co(n.mergedAttrs, n.attrs);
      }
      function Fg(t, e, n, r, i, o) {
        for (let u = 0; u < r.length; u++) Fu(Zs(n, e), t, r[u].type);
        !(function AI(t, e, n) {
          (t.flags |= 1),
            (t.directiveStart = e),
            (t.directiveEnd = e + n),
            (t.providerIndexes = e);
        })(n, t.data.length, r.length);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          l = ko(t, e, r.length, null);
        for (let u = 0; u < r.length; u++) {
          const c = r[u];
          (n.mergedAttrs = co(n.mergedAttrs, c.hostAttrs)),
            NI(t, n, e, l, c),
            TI(l, c, i),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((t.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((t.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            l++;
        }
        !(function _I(t, e, n) {
          const i = e.directiveEnd,
            o = t.data,
            s = e.attrs,
            a = [];
          let l = null,
            u = null;
          for (let c = e.directiveStart; c < i; c++) {
            const d = o[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (l = Ag(d.inputs, c, l, f ? f.inputs : null)),
              (u = Ag(d.outputs, c, u, p));
            const m = null === l || null === s || Zh(e) ? null : xI(l, c, s);
            a.push(m);
          }
          null !== l &&
            (l.hasOwnProperty("class") && (e.flags |= 8),
            l.hasOwnProperty("style") && (e.flags |= 16)),
            (e.initialInputs = a),
            (e.inputs = l),
            (e.outputs = u);
        })(t, n, o);
      }
      function Og(t, e, n) {
        const r = n.directiveStart,
          i = n.directiveEnd,
          o = n.index,
          s = (function MM() {
            return V.lFrame.currentDirectiveIndex;
          })();
        try {
          Br(o);
          for (let a = r; a < i; a++) {
            const l = t.data[a],
              u = e[a];
            Eu(a),
              (null !== l.hostBindings ||
                0 !== l.hostVars ||
                null !== l.hostAttrs) &&
                MI(l, u);
          }
        } finally {
          Br(-1), Eu(s);
        }
      }
      function MI(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function xc(t, e, n) {
        (e.componentOffset = n), (t.components ??= []).push(e.index);
      }
      function TI(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          yn(e) && (n[""] = t);
        }
      }
      function NI(t, e, n, r, i) {
        t.data[r] = i;
        const o = i.factory || (i.factory = Vr(i.type)),
          s = new _o(o, yn(i), E);
        (t.blueprint[r] = s),
          (n[r] = s),
          (function bI(t, e, n, r, i) {
            const o = i.hostBindings;
            if (o) {
              let s = t.hostBindingOpCodes;
              null === s && (s = t.hostBindingOpCodes = []);
              const a = ~e.index;
              (function wI(t) {
                let e = t.length;
                for (; e > 0; ) {
                  const n = t[--e];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, o);
            }
          })(t, e, r, ko(t, n, i.hostVars, W), i);
      }
      function Ln(t, e, n, r, i, o) {
        const s = kt(t, e);
        !(function Rc(t, e, n, r, i, o, s) {
          if (null == o) t.removeAttribute(e, i, n);
          else {
            const a = null == s ? $(o) : s(o, r || "", i);
            t.setAttribute(e, i, a, n);
          }
        })(e[q], s, o, t.value, n, r, i);
      }
      function OI(t, e, n, r, i, o) {
        const s = o[e];
        if (null !== s)
          for (let a = 0; a < s.length; ) xg(r, n, s[a++], s[a++], s[a++]);
      }
      function xg(t, e, n, r, i) {
        const o = nt(null);
        try {
          null !== t.setInput ? t.setInput(e, i, n, r) : (e[r] = i);
        } finally {
          nt(o);
        }
      }
      function xI(t, e, n) {
        let r = null,
          i = 0;
        for (; i < n.length; ) {
          const o = n[i];
          if (0 !== o)
            if (5 !== o) {
              if ("number" == typeof o) break;
              if (t.hasOwnProperty(o)) {
                null === r && (r = []);
                const s = t[o];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === e) {
                    r.push(o, s[a + 1], n[i + 1]);
                    break;
                  }
              }
              i += 2;
            } else i += 2;
          else i += 4;
        }
        return r;
      }
      function Rg(t, e, n, r) {
        return [t, !0, !1, e, null, 0, r, n, null, null, null];
      }
      function Pg(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const o = n[r + 1];
            if (-1 !== o) {
              const s = t.data[o];
              wu(n[r]), s.contentQueries(2, e[o], o);
            }
          }
      }
      function Ia(t, e) {
        return t[ho] ? (t[tp][gn] = e) : (t[ho] = e), (t[tp] = e), e;
      }
      function Pc(t, e, n) {
        wu(0);
        const r = nt(null);
        try {
          e(t, n);
        } finally {
          nt(r);
        }
      }
      function Bg(t, e) {
        const n = t[fi],
          r = n ? n.get(kn, null) : null;
        r && r.handleError(e);
      }
      function kc(t, e, n, r, i) {
        for (let o = 0; o < n.length; ) {
          const s = n[o++],
            a = n[o++];
          xg(t.data[s], e[s], r, a, i);
        }
      }
      function RI(t, e) {
        const n = Lt(e, t),
          r = n[w];
        !(function PI(t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n);
        const i = n[Ze];
        null !== i && null === n[Xn] && (n[Xn] = rg(i, n[fi])), Lc(r, n, n[Le]);
      }
      function Lc(t, e, n) {
        Cu(e);
        try {
          const r = t.viewQuery;
          null !== r && Pc(1, r, n);
          const i = t.template;
          null !== i && Sg(t, e, i, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Pg(t, e),
            t.staticViewQueries && Pc(2, t.viewQuery, n);
          const o = t.components;
          null !== o &&
            (function kI(t, e) {
              for (let n = 0; n < e.length; n++) RI(t, e[n]);
            })(e, o);
        } catch (r) {
          throw (
            (t.firstCreatePass &&
              ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
            r)
          );
        } finally {
          (e[K] &= -5), Mu();
        }
      }
      let Hg = (() => {
        class t {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(n, r, i) {
            const o = typeof Zone > "u" ? null : Zone.current,
              s = new eM(
                n,
                (u) => {
                  this.all.has(u) && this.queue.set(u, o);
                },
                i
              );
            let a;
            this.all.add(s), s.notify();
            const l = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s);
            };
            return (a = r?.onDestroy(l)), { destroy: l };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          (t.ɵprov = ee({
            token: t,
            providedIn: "root",
            factory: () => new t(),
          })),
          t
        );
      })();
      function Ta(t, e, n) {
        let r = n ? t.styles : null,
          i = n ? t.classes : null,
          o = 0;
        if (null !== e)
          for (let s = 0; s < e.length; s++) {
            const a = e[s];
            "number" == typeof a
              ? (o = a)
              : 1 == o
              ? (i = tu(i, a))
              : 2 == o && (r = tu(r, a + ": " + e[++s] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = i) : (t.classesWithoutHost = i);
      }
      function Lo(t, e, n, r, i = !1) {
        for (; null !== n; ) {
          const o = e[n.index];
          if ((null !== o && r.push(Ie(o)), Pt(o))) {
            for (let a = ot; a < o.length; a++) {
              const l = o[a],
                u = l[w].firstChild;
              null !== u && Lo(l[w], l, u, r);
            }
            o[Nn] !== o[Ze] && r.push(o[Nn]);
          }
          const s = n.type;
          if (8 & s) Lo(t, e, n.child, r);
          else if (32 & s) {
            const a = zu(n, e);
            let l;
            for (; (l = a()); ) r.push(l);
          } else if (16 & s) {
            const a = Im(e, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const l = Mo(e[ze]);
              Lo(l[w], l, a, r, !0);
            }
          }
          n = i ? n.projectionNext : n.next;
        }
        return r;
      }
      function Aa(t, e, n, r = !0) {
        const i = e[kr].rendererFactory;
        i.begin && i.begin();
        try {
          Na(t, e, t.template, n);
        } catch (s) {
          throw (r && Bg(e, s), s);
        } finally {
          i.end && i.end(), e[kr].effectManager?.flush();
        }
      }
      function Na(t, e, n, r) {
        const i = e[K];
        if (256 != (256 & i)) {
          e[kr].effectManager?.flush(), Cu(e);
          try {
            _p(e),
              (function Sp(t) {
                return (V.lFrame.bindingIndex = t);
              })(t.bindingStartIndex),
              null !== n && Sg(t, e, n, 2, r);
            const s = 3 == (3 & i);
            if (s) {
              const u = t.preOrderCheckHooks;
              null !== u && zs(e, u, null);
            } else {
              const u = t.preOrderHooks;
              null !== u && Gs(e, u, 0, null), Su(e, 0);
            }
            if (
              ((function UI(t) {
                for (let e = Gu(t); null !== e; e = qu(e)) {
                  if (!e[rp]) continue;
                  const n = e[mi];
                  for (let r = 0; r < n.length; r++) {
                    cM(n[r]);
                  }
                }
              })(e),
              (function jI(t) {
                for (let e = Gu(t); null !== e; e = qu(e))
                  for (let n = ot; n < e.length; n++) {
                    const r = e[n],
                      i = r[w];
                    js(r) && Na(i, r, i.template, r[Le]);
                  }
              })(e),
              null !== t.contentQueries && Pg(t, e),
              s)
            ) {
              const u = t.contentCheckHooks;
              null !== u && zs(e, u);
            } else {
              const u = t.contentHooks;
              null !== u && Gs(e, u, 1), Su(e, 1);
            }
            !(function cI(t, e) {
              const n = t.hostBindingOpCodes;
              if (null === n) return;
              const r = _g(e, Rs);
              try {
                for (let i = 0; i < n.length; i++) {
                  const o = n[i];
                  if (o < 0) Br(~o);
                  else {
                    const s = o,
                      a = n[++i],
                      l = n[++i];
                    CM(a, s), r.runInContext(l, 2, e[s]);
                  }
                }
              } finally {
                null === e[Rs] && vg(e, Rs), Br(-1);
              }
            })(t, e);
            const a = t.components;
            null !== a &&
              (function zI(t, e) {
                for (let n = 0; n < e.length; n++) $I(t, e[n]);
              })(e, a);
            const l = t.viewQuery;
            if ((null !== l && Pc(2, l, r), s)) {
              const u = t.viewCheckHooks;
              null !== u && zs(e, u);
            } else {
              const u = t.viewHooks;
              null !== u && Gs(e, u, 2), Su(e, 2);
            }
            !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
              (e[K] &= -73),
              vp(e);
          } finally {
            Mu();
          }
        }
      }
      function $I(t, e) {
        const n = Lt(e, t);
        if (js(n)) {
          const r = n[w];
          80 & n[K] ? Na(r, n, r.template, n[Le]) : n[Pr] > 0 && Vc(n);
        }
      }
      function Vc(t) {
        for (let r = Gu(t); null !== r; r = qu(r))
          for (let i = ot; i < r.length; i++) {
            const o = r[i];
            if (js(o))
              if (1024 & o[K]) {
                const s = o[w];
                Na(s, o, s.template, o[Le]);
              } else o[Pr] > 0 && Vc(o);
          }
        const n = t[w].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const i = Lt(n[r], t);
            js(i) && i[Pr] > 0 && Vc(i);
          }
      }
      class Vo {
        get rootNodes() {
          const e = this._lView,
            n = e[w];
          return Lo(n, e, n.firstChild, []);
        }
        constructor(e, n) {
          (this._lView = e),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[Le];
        }
        set context(e) {
          this._lView[Le] = e;
        }
        get destroyed() {
          return 256 == (256 & this._lView[K]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const e = this._lView[Oe];
            if (Pt(e)) {
              const n = e[Ps],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Ku(e, r), Xs(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          vm(this._lView[w], this._lView);
        }
        onDestroy(e) {
          !(function Ep(t, e) {
            if (256 == (256 & t[K])) throw new _(911, !1);
            null === t[vr] && (t[vr] = []), t[vr].push(e);
          })(this._lView, e);
        }
        markForCheck() {
          Po(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[K] &= -129;
        }
        reattach() {
          this._lView[K] |= 128;
        }
        detectChanges() {
          Aa(this._lView[w], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new _(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function PS(t, e) {
              Io(t, e, e[q], 2, null, null);
            })(this._lView[w], this._lView);
        }
        attachToAppRef(e) {
          if (this._attachedToViewContainer) throw new _(902, !1);
          this._appRef = e;
        }
      }
      class GI extends Vo {
        constructor(e) {
          super(e), (this._view = e);
        }
        detectChanges() {
          const e = this._view;
          Aa(e[w], e, e[Le], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class jg extends wa {
        constructor(e) {
          super(), (this.ngModule = e);
        }
        resolveComponentFactory(e) {
          const n = ue(e);
          return new Bo(n, this.ngModule);
        }
      }
      function Ug(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      class WI {
        constructor(e, n) {
          (this.injector = e), (this.parentInjector = n);
        }
        get(e, n, r) {
          r = Ns(r);
          const i = this.injector.get(e, Mc, r);
          return i !== Mc || n === Mc ? i : this.parentInjector.get(e, n, r);
        }
      }
      class Bo extends sg {
        get inputs() {
          return Ug(this.componentDef.inputs);
        }
        get outputs() {
          return Ug(this.componentDef.outputs);
        }
        constructor(e, n) {
          super(),
            (this.componentDef = e),
            (this.ngModule = n),
            (this.componentType = e.type),
            (this.selector = (function kC(t) {
              return t.map(PC).join(",");
            })(e.selectors)),
            (this.ngContentSelectors = e.ngContentSelectors
              ? e.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(e, n, r, i) {
          let o = (i = i || this.ngModule) instanceof Fi ? i : i?.injector;
          o &&
            null !== this.componentDef.getStandaloneInjector &&
            (o = this.componentDef.getStandaloneInjector(o) || o);
          const s = o ? new WI(e, o) : e,
            a = s.get(Ro, null);
          if (null === a) throw new _(407, !1);
          const c = {
              rendererFactory: a,
              sanitizer: s.get(Z0, null),
              effectManager: s.get(Hg, null),
            },
            d = a.createRenderer(null, this.componentDef),
            f = this.componentDef.selectors[0][0] || "div",
            h = r
              ? (function fI(t, e, n, r) {
                  const o = r.get(cg, !1) || n === Ot.ShadowDom,
                    s = t.selectRootElement(e, o);
                  return (
                    (function hI(t) {
                      Tg(t);
                    })(s),
                    s
                  );
                })(d, r, this.componentDef.encapsulation, s)
              : aa(
                  d,
                  f,
                  (function qI(t) {
                    const e = t.toLowerCase();
                    return "svg" === e ? "svg" : "math" === e ? "math" : null;
                  })(f)
                ),
            p = this.componentDef.onPush ? 576 : 528,
            m = Fc(0, null, null, 1, 0, null, null, null, null, null, null),
            y = Sa(null, m, null, p, null, null, c, d, s, null, null);
          let v, g;
          Cu(y);
          try {
            const b = this.componentDef;
            let T,
              z = null;
            b.findHostDirectiveDefs
              ? ((T = []),
                (z = new Map()),
                b.findHostDirectiveDefs(b, T, z),
                T.push(b))
              : (T = [b]);
            const Pe = (function ZI(t, e) {
                const n = t[w],
                  r = ie;
                return (t[r] = e), ki(n, r, 2, "#host", null);
              })(y, h),
              rt = (function QI(t, e, n, r, i, o, s) {
                const a = i[w];
                !(function YI(t, e, n, r) {
                  for (const i of t)
                    e.mergedAttrs = co(e.mergedAttrs, i.hostAttrs);
                  null !== e.mergedAttrs &&
                    (Ta(e, e.mergedAttrs, !0), null !== n && Fm(r, n, e));
                })(r, t, e, s);
                let l = null;
                null !== e && (l = rg(e, i[fi]));
                const u = o.rendererFactory.createRenderer(e, n),
                  c = Sa(
                    i,
                    Ig(n),
                    null,
                    n.onPush ? 64 : 16,
                    i[t.index],
                    t,
                    o,
                    u,
                    null,
                    null,
                    l
                  );
                return (
                  a.firstCreatePass && xc(a, t, r.length - 1),
                  Ia(i, c),
                  (i[t.index] = c)
                );
              })(Pe, h, b, T, y, c, d);
            (g = yp(m, ie)),
              h &&
                (function JI(t, e, n, r) {
                  if (r) cu(t, n, ["ng-version", Q0.full]);
                  else {
                    const { attrs: i, classes: o } = (function LC(t) {
                      const e = [],
                        n = [];
                      let r = 1,
                        i = 2;
                      for (; r < t.length; ) {
                        let o = t[r];
                        if ("string" == typeof o)
                          2 === i
                            ? "" !== o && e.push(o, t[++r])
                            : 8 === i && n.push(o);
                        else {
                          if (!mn(i)) break;
                          i = o;
                        }
                        r++;
                      }
                      return { attrs: e, classes: n };
                    })(e.selectors[0]);
                    i && cu(t, n, i),
                      o && o.length > 0 && Nm(t, n, o.join(" "));
                  }
                })(d, b, h, r),
              void 0 !== n &&
                (function eT(t, e, n) {
                  const r = (t.projection = []);
                  for (let i = 0; i < e.length; i++) {
                    const o = n[i];
                    r.push(null != o ? Array.from(o) : null);
                  }
                })(g, this.ngContentSelectors, n),
              (v = (function XI(t, e, n, r, i, o) {
                const s = st(),
                  a = i[w],
                  l = kt(s, i);
                Fg(a, i, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  pt(Hr(i, a, s.directiveStart + c, s), i);
                Og(a, i, s), l && pt(l, i);
                const u = Hr(i, a, s.directiveStart + s.componentOffset, s);
                if (((t[Le] = i[Le] = u), null !== o))
                  for (const c of o) c(u, e);
                return Tc(a, s, t), u;
              })(rt, b, T, z, y, [tT])),
              Lc(m, y, null);
          } finally {
            Mu();
          }
          return new KI(this.componentType, v, xi(g, y), y, g);
        }
      }
      class KI extends $0 {
        constructor(e, n, r, i, o) {
          super(),
            (this.location = r),
            (this._rootLView = i),
            (this._tNode = o),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new GI(i)),
            (this.componentType = e);
        }
        setInput(e, n) {
          const r = this._tNode.inputs;
          let i;
          if (null !== r && (i = r[e])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(e) &&
                Object.is(this.previousInputValues.get(e), n))
            )
              return;
            const o = this._rootLView;
            kc(o[w], o, i, e, n),
              this.previousInputValues.set(e, n),
              Po(Lt(this._tNode.index, o));
          }
        }
        get injector() {
          return new Di(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(e) {
          this.hostView.onDestroy(e);
        }
      }
      function tT() {
        const t = st();
        $s(D()[w], t);
      }
      function me(t) {
        let e = (function $g(t) {
            return Object.getPrototypeOf(t.prototype).constructor;
          })(t.type),
          n = !0;
        const r = [t];
        for (; e; ) {
          let i;
          if (yn(t)) i = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new _(903, !1);
            i = e.ɵdir;
          }
          if (i) {
            if (n) {
              r.push(i);
              const s = t;
              (s.inputs = Bc(t.inputs)),
                (s.declaredInputs = Bc(t.declaredInputs)),
                (s.outputs = Bc(t.outputs));
              const a = i.hostBindings;
              a && oT(t, a);
              const l = i.viewQuery,
                u = i.contentQueries;
              if (
                (l && rT(t, l),
                u && iT(t, u),
                eu(t.inputs, i.inputs),
                eu(t.declaredInputs, i.declaredInputs),
                eu(t.outputs, i.outputs),
                yn(i) && i.data.animation)
              ) {
                const c = t.data;
                c.animation = (c.animation || []).concat(i.data.animation);
              }
            }
            const o = i.features;
            if (o)
              for (let s = 0; s < o.length; s++) {
                const a = o[s];
                a && a.ngInherit && a(t), a === me && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function nT(t) {
          let e = 0,
            n = null;
          for (let r = t.length - 1; r >= 0; r--) {
            const i = t[r];
            (i.hostVars = e += i.hostVars),
              (i.hostAttrs = co(i.hostAttrs, (n = co(n, i.hostAttrs))));
          }
        })(r);
      }
      function Bc(t) {
        return t === Qn ? {} : t === le ? [] : t;
      }
      function rT(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (r, i) => {
              e(r, i), n(r, i);
            }
          : e;
      }
      function iT(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (r, i, o) => {
              e(r, i, o), n(r, i, o);
            }
          : e;
      }
      function oT(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (r, i) => {
              e(r, i), n(r, i);
            }
          : e;
      }
      function Fa(t) {
        return (
          !!(function Hc(t) {
            return (
              null !== t && ("function" == typeof t || "object" == typeof t)
            );
          })(t) &&
          (Array.isArray(t) || (!(t instanceof Map) && Symbol.iterator in t))
        );
      }
      function mt(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function Bn(t, e, n, r) {
        const i = D();
        return mt(i, _i(), e) && (oe(), Ln(xe(), i, t, e, n, r)), Bn;
      }
      function ka(t, e, n, r, i, o, s, a) {
        const l = D(),
          u = oe(),
          c = t + ie,
          d = u.firstCreatePass
            ? (function NT(t, e, n, r, i, o, s, a, l) {
                const u = e.consts,
                  c = ki(e, t, 4, s || null, Dr(u, a));
                Oc(e, n, c, Dr(u, l)), $s(e, c);
                const d = (c.tView = Fc(
                  2,
                  c,
                  r,
                  i,
                  o,
                  e.directiveRegistry,
                  e.pipeRegistry,
                  null,
                  e.schemas,
                  u,
                  null
                ));
                return (
                  null !== e.queries &&
                    (e.queries.template(e, c),
                    (d.queries = e.queries.embeddedTView(c))),
                  c
                );
              })(c, u, l, e, n, r, i, o, s)
            : u.data[c];
        xn(d, !1);
        const f = oy(u, l, d, t);
        Us() && ua(u, l, f, d),
          pt(f, l),
          Ia(l, (l[c] = Rg(f, l, f, d))),
          ks(d) && Ac(u, l, d),
          null != s && Nc(l, d, a);
      }
      let oy = function sy(t, e, n, r) {
        return Er(!0), e[q].createComment("");
      };
      function zo(t, e, n) {
        const r = D();
        return (
          mt(r, _i(), e) &&
            (function Qt(t, e, n, r, i, o, s, a) {
              const l = kt(e, n);
              let c,
                u = e.inputs;
              !a && null != u && (c = u[r])
                ? (kc(t, n, c, r, i),
                  Lr(e) &&
                    (function DI(t, e) {
                      const n = Lt(e, t);
                      16 & n[K] || (n[K] |= 64);
                    })(n, e.index))
                : 3 & e.type &&
                  ((r = (function vI(t) {
                    return "class" === t
                      ? "className"
                      : "for" === t
                      ? "htmlFor"
                      : "formaction" === t
                      ? "formAction"
                      : "innerHtml" === t
                      ? "innerHTML"
                      : "readonly" === t
                      ? "readOnly"
                      : "tabindex" === t
                      ? "tabIndex"
                      : t;
                  })(r)),
                  (i = null != s ? s(i, e.value || "", r) : i),
                  o.setProperty(l, r, i));
            })(oe(), xe(), r, t, e, r[q], n, !1),
          zo
        );
      }
      function qc(t, e, n, r, i) {
        const s = i ? "class" : "style";
        kc(t, n, e.inputs[s], s, r);
      }
      function at(t, e, n, r) {
        const i = D(),
          o = oe(),
          s = ie + t,
          a = i[q],
          l = o.firstCreatePass
            ? (function PT(t, e, n, r, i, o) {
                const s = e.consts,
                  l = ki(e, t, 2, r, Dr(s, i));
                return (
                  Oc(e, n, l, Dr(s, o)),
                  null !== l.attrs && Ta(l, l.attrs, !1),
                  null !== l.mergedAttrs && Ta(l, l.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, l),
                  l
                );
              })(s, o, i, e, n, r)
            : o.data[s],
          u = ay(o, i, l, a, e, t);
        i[s] = u;
        const c = ks(l);
        return (
          xn(l, !0),
          Fm(a, u, l),
          32 != (32 & l.flags) && Us() && ua(o, i, u, l),
          0 ===
            (function fM() {
              return V.lFrame.elementDepthCount;
            })() && pt(u, i),
          (function hM() {
            V.lFrame.elementDepthCount++;
          })(),
          c && (Ac(o, i, l), Tc(o, l, i)),
          null !== r && Nc(i, l),
          at
        );
      }
      function gt() {
        let t = st();
        vu() ? Du() : ((t = t.parent), xn(t, !1));
        const e = t;
        (function mM(t) {
          return V.skipHydrationRootTNode === t;
        })(e) &&
          (function vM() {
            V.skipHydrationRootTNode = null;
          })(),
          (function pM() {
            V.lFrame.elementDepthCount--;
          })();
        const n = oe();
        return (
          n.firstCreatePass && ($s(n, t), fu(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function kM(t) {
              return 0 != (8 & t.flags);
            })(e) &&
            qc(n, e, D(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function LM(t) {
              return 0 != (16 & t.flags);
            })(e) &&
            qc(n, e, D(), e.stylesWithoutHost, !1),
          gt
        );
      }
      function La(t, e, n, r) {
        return at(t, e, n, r), gt(), La;
      }
      let ay = (t, e, n, r, i, o) => (
        Er(!0),
        aa(
          r,
          i,
          (function Rp() {
            return V.lFrame.currentNamespace;
          })()
        )
      );
      function Va(t) {
        return !!t && "function" == typeof t.then;
      }
      function cy(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      function Yt(t, e, n, r) {
        const i = D(),
          o = oe(),
          s = st();
        return (
          (function fy(t, e, n, r, i, o, s) {
            const a = ks(r),
              u =
                t.firstCreatePass &&
                (function Lg(t) {
                  return t.cleanup || (t.cleanup = []);
                })(t),
              c = e[Le],
              d = (function kg(t) {
                return t[di] || (t[di] = []);
              })(e);
            let f = !0;
            if (3 & r.type || s) {
              const m = kt(r, e),
                y = s ? s(m) : m,
                v = d.length,
                g = s ? (T) => s(Ie(T[r.index])) : r.index;
              let b = null;
              if (
                (!s &&
                  a &&
                  (b = (function UT(t, e, n, r) {
                    const i = t.cleanup;
                    if (null != i)
                      for (let o = 0; o < i.length - 1; o += 2) {
                        const s = i[o];
                        if (s === n && i[o + 1] === r) {
                          const a = e[di],
                            l = i[o + 2];
                          return a.length > l ? a[l] : null;
                        }
                        "string" == typeof s && (o += 2);
                      }
                    return null;
                  })(t, e, i, r.index)),
                null !== b)
              )
                ((b.__ngLastListenerFn__ || b).__ngNextListenerFn__ = o),
                  (b.__ngLastListenerFn__ = o),
                  (f = !1);
              else {
                o = py(r, e, c, o, !1);
                const T = n.listen(y, i, o);
                d.push(o, T), u && u.push(i, g, v, v + 1);
              }
            } else o = py(r, e, c, o, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[i])) {
              const m = p.length;
              if (m)
                for (let y = 0; y < m; y += 2) {
                  const z = e[p[y]][p[y + 1]].subscribe(o),
                    Pe = d.length;
                  d.push(o, z), u && u.push(i, r.index, Pe, -(Pe + 1));
                }
            }
          })(o, i, i[q], s, t, e, r),
          Yt
        );
      }
      function hy(t, e, n, r) {
        try {
          return On(6, e, n), !1 !== n(r);
        } catch (i) {
          return Bg(t, i), !1;
        } finally {
          On(7, e, n);
        }
      }
      function py(t, e, n, r, i) {
        return function o(s) {
          if (s === Function) return r;
          Po(t.componentOffset > -1 ? Lt(t.index, e) : e);
          let l = hy(e, n, r, s),
            u = o.__ngNextListenerFn__;
          for (; u; ) (l = hy(e, n, u, s) && l), (u = u.__ngNextListenerFn__);
          return i && !1 === l && s.preventDefault(), l;
        };
      }
      function zT(t, e) {
        let n = null;
        const r = (function FC(t) {
          const e = t.attrs;
          if (null != e) {
            const n = e.indexOf(5);
            if (!(1 & n)) return e[n + 1];
          }
          return null;
        })(t);
        for (let i = 0; i < e.length; i++) {
          const o = e[i];
          if ("*" !== o) {
            if (null === r ? Qh(t, o, !0) : RC(r, o)) return i;
          } else n = i;
        }
        return n;
      }
      function Ba(t, e) {
        return (t << 17) | (e << 2);
      }
      function br(t) {
        return (t >> 17) & 32767;
      }
      function Qc(t) {
        return 2 | t;
      }
      function Kr(t) {
        return (131068 & t) >> 2;
      }
      function Yc(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function Xc(t) {
        return 1 | t;
      }
      function Sy(t, e, n, r, i) {
        const o = t[n + 1],
          s = null === e;
        let a = r ? br(o) : Kr(o),
          l = !1;
        for (; 0 !== a && (!1 === l || s); ) {
          const c = t[a + 1];
          QT(t[a], e) && ((l = !0), (t[a + 1] = r ? Xc(c) : Qc(c))),
            (a = r ? br(c) : Kr(c));
        }
        l && (t[n + 1] = r ? Qc(o) : Xc(o));
      }
      function QT(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && Mi(t, e) >= 0)
        );
      }
      const Ye = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Iy(t) {
        return t.substring(Ye.key, Ye.keyEnd);
      }
      function Ty(t, e) {
        const n = Ye.textEnd;
        return n === e
          ? -1
          : ((e = Ye.keyEnd =
              (function eA(t, e, n) {
                for (; e < n && t.charCodeAt(e) > 32; ) e++;
                return e;
              })(t, (Ye.key = e), n)),
            qi(t, e, n));
      }
      function qi(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function Go(t, e) {
        return (
          (function _n(t, e, n, r) {
            const i = D(),
              o = oe(),
              s = tr(2);
            o.firstUpdatePass && Py(o, t, s, r),
              e !== W &&
                mt(i, s, e) &&
                Ly(
                  o,
                  o.data[St()],
                  i,
                  i[q],
                  t,
                  (i[s + 1] = (function dA(t, e) {
                    return (
                      null == t ||
                        "" === t ||
                        ("string" == typeof e
                          ? (t += e)
                          : "object" == typeof t && (t = Ke(Kt(t)))),
                      t
                    );
                  })(e, n)),
                  r,
                  s
                );
          })(t, e, null, !0),
          Go
        );
      }
      function Jc(t) {
        !(function vn(t, e, n, r) {
          const i = oe(),
            o = tr(2);
          i.firstUpdatePass && Py(i, null, o, r);
          const s = D();
          if (n !== W && mt(s, o, n)) {
            const a = i.data[St()];
            if (By(a, r) && !Ry(i, o)) {
              let l = r ? a.classesWithoutHost : a.stylesWithoutHost;
              null !== l && (n = tu(l, n || "")), qc(i, a, s, n, r);
            } else
              !(function cA(t, e, n, r, i, o, s, a) {
                i === W && (i = le);
                let l = 0,
                  u = 0,
                  c = 0 < i.length ? i[0] : null,
                  d = 0 < o.length ? o[0] : null;
                for (; null !== c || null !== d; ) {
                  const f = l < i.length ? i[l + 1] : void 0,
                    h = u < o.length ? o[u + 1] : void 0;
                  let m,
                    p = null;
                  c === d
                    ? ((l += 2), (u += 2), f !== h && ((p = d), (m = h)))
                    : null === d || (null !== c && c < d)
                    ? ((l += 2), (p = c))
                    : ((u += 2), (p = d), (m = h)),
                    null !== p && Ly(t, e, n, r, p, m, s, a),
                    (c = l < i.length ? i[l] : null),
                    (d = u < o.length ? o[u] : null);
                }
              })(
                i,
                a,
                s,
                s[q],
                s[o + 1],
                (s[o + 1] = (function lA(t, e, n) {
                  if (null == n || "" === n) return le;
                  const r = [],
                    i = Kt(n);
                  if (Array.isArray(i))
                    for (let o = 0; o < i.length; o++) t(r, i[o], !0);
                  else if ("object" == typeof i)
                    for (const o in i) i.hasOwnProperty(o) && t(r, o, i[o]);
                  else "string" == typeof i && e(r, i);
                  return r;
                })(t, e, n)),
                r,
                o
              );
          }
        })(uA, jn, t, !0);
      }
      function jn(t, e) {
        for (
          let n = (function XT(t) {
            return (
              (function Ny(t) {
                (Ye.key = 0),
                  (Ye.keyEnd = 0),
                  (Ye.value = 0),
                  (Ye.valueEnd = 0),
                  (Ye.textEnd = t.length);
              })(t),
              Ty(t, qi(t, 0, Ye.textEnd))
            );
          })(e);
          n >= 0;
          n = Ty(e, n)
        )
          Wt(t, Iy(e), !0);
      }
      function Ry(t, e) {
        return e >= t.expandoStartIndex;
      }
      function Py(t, e, n, r) {
        const i = t.data;
        if (null === i[n + 1]) {
          const o = i[St()],
            s = Ry(t, n);
          By(o, r) && null === e && !s && (e = !1),
            (e = (function iA(t, e, n, r) {
              const i = (function bu(t) {
                const e = V.lFrame.currentDirectiveIndex;
                return -1 === e ? null : t[e];
              })(t);
              let o = r ? e.residualClasses : e.residualStyles;
              if (null === i)
                0 === (r ? e.classBindings : e.styleBindings) &&
                  ((n = qo((n = ed(null, t, e, n, r)), e.attrs, r)),
                  (o = null));
              else {
                const s = e.directiveStylingLast;
                if (-1 === s || t[s] !== i)
                  if (((n = ed(i, t, e, n, r)), null === o)) {
                    let l = (function oA(t, e, n) {
                      const r = n ? e.classBindings : e.styleBindings;
                      if (0 !== Kr(r)) return t[br(r)];
                    })(t, e, r);
                    void 0 !== l &&
                      Array.isArray(l) &&
                      ((l = ed(null, t, e, l[1], r)),
                      (l = qo(l, e.attrs, r)),
                      (function sA(t, e, n, r) {
                        t[br(n ? e.classBindings : e.styleBindings)] = r;
                      })(t, e, r, l));
                  } else
                    o = (function aA(t, e, n) {
                      let r;
                      const i = e.directiveEnd;
                      for (let o = 1 + e.directiveStylingLast; o < i; o++)
                        r = qo(r, t[o].hostAttrs, n);
                      return qo(r, e.attrs, n);
                    })(t, e, r);
              }
              return (
                void 0 !== o &&
                  (r ? (e.residualClasses = o) : (e.residualStyles = o)),
                n
              );
            })(i, o, e, r)),
            (function KT(t, e, n, r, i, o) {
              let s = o ? e.classBindings : e.styleBindings,
                a = br(s),
                l = Kr(s);
              t[r] = n;
              let c,
                u = !1;
              if (
                (Array.isArray(n)
                  ? ((c = n[1]), (null === c || Mi(n, c) > 0) && (u = !0))
                  : (c = n),
                i)
              )
                if (0 !== l) {
                  const f = br(t[a + 1]);
                  (t[r + 1] = Ba(f, a)),
                    0 !== f && (t[f + 1] = Yc(t[f + 1], r)),
                    (t[a + 1] = (function qT(t, e) {
                      return (131071 & t) | (e << 17);
                    })(t[a + 1], r));
                } else
                  (t[r + 1] = Ba(a, 0)),
                    0 !== a && (t[a + 1] = Yc(t[a + 1], r)),
                    (a = r);
              else
                (t[r + 1] = Ba(l, 0)),
                  0 === a ? (a = r) : (t[l + 1] = Yc(t[l + 1], r)),
                  (l = r);
              u && (t[r + 1] = Qc(t[r + 1])),
                Sy(t, c, r, !0),
                Sy(t, c, r, !1),
                (function ZT(t, e, n, r, i) {
                  const o = i ? t.residualClasses : t.residualStyles;
                  null != o &&
                    "string" == typeof e &&
                    Mi(o, e) >= 0 &&
                    (n[r + 1] = Xc(n[r + 1]));
                })(e, c, t, r, o),
                (s = Ba(a, l)),
                o ? (e.classBindings = s) : (e.styleBindings = s);
            })(i, o, e, n, s, r);
        }
      }
      function ed(t, e, n, r, i) {
        let o = null;
        const s = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < s && ((o = e[a]), (r = qo(r, o.hostAttrs, i)), o !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), r;
      }
      function qo(t, e, n) {
        const r = n ? 1 : 2;
        let i = -1;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const s = e[o];
            "number" == typeof s
              ? (i = s)
              : i === r &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                Wt(t, s, !!n || e[++o]));
          }
        return void 0 === t ? null : t;
      }
      function uA(t, e, n) {
        const r = String(e);
        "" !== r && !r.includes(" ") && Wt(t, r, n);
      }
      function Ly(t, e, n, r, i, o, s, a) {
        if (!(3 & e.type)) return;
        const l = t.data,
          u = l[a + 1],
          c = (function WT(t) {
            return 1 == (1 & t);
          })(u)
            ? Vy(l, e, n, i, Kr(u), s)
            : void 0;
        Ha(c) ||
          (Ha(o) ||
            ((function GT(t) {
              return 2 == (2 & t);
            })(u) &&
              (o = Vy(l, null, n, i, a, s))),
          (function GS(t, e, n, r, i) {
            if (e) i ? t.addClass(n, r) : t.removeClass(n, r);
            else {
              let o = -1 === r.indexOf("-") ? void 0 : Vt.DashCase;
              null == i
                ? t.removeStyle(n, r, o)
                : ("string" == typeof i &&
                    i.endsWith("!important") &&
                    ((i = i.slice(0, -10)), (o |= Vt.Important)),
                  t.setStyle(n, r, i, o));
            }
          })(r, s, Hs(St(), n), i, o));
      }
      function Vy(t, e, n, r, i, o) {
        const s = null === e;
        let a;
        for (; i > 0; ) {
          const l = t[i],
            u = Array.isArray(l),
            c = u ? l[1] : l,
            d = null === c;
          let f = n[i + 1];
          f === W && (f = d ? le : void 0);
          let h = d ? Ru(f, r) : c === r ? f : void 0;
          if ((u && !Ha(h) && (h = Ru(l, r)), Ha(h) && ((a = h), s))) return a;
          const p = t[i + 1];
          i = s ? br(p) : Kr(p);
        }
        if (null !== e) {
          let l = o ? e.residualClasses : e.residualStyles;
          null != l && (a = Ru(l, r));
        }
        return a;
      }
      function Ha(t) {
        return void 0 !== t;
      }
      function By(t, e) {
        return 0 != (t.flags & (e ? 8 : 16));
      }
      function ln(t, e = "") {
        const n = D(),
          r = oe(),
          i = t + ie,
          o = r.firstCreatePass ? ki(r, i, 1, e, null) : r.data[i],
          s = Hy(r, n, o, e, t);
        (n[i] = s), Us() && ua(r, n, s, o), xn(o, !1);
      }
      let Hy = (t, e, n, r, i) => (
        Er(!0),
        (function sa(t, e) {
          return t.createText(e);
        })(e[q], r)
      );
      function ja(t) {
        return td("", t, ""), ja;
      }
      function td(t, e, n) {
        const r = D(),
          i = (function Vi(t, e, n, r) {
            return mt(t, _i(), n) ? e + $(n) + r : W;
          })(r, t, e, n);
        return (
          i !== W &&
            (function or(t, e, n) {
              const r = Hs(e, t);
              !(function ym(t, e, n) {
                t.setValue(e, n);
              })(t[q], r, n);
            })(r, St(), i),
          td
        );
      }
      const Ki = "en-US";
      let l_ = Ki;
      class Zi {}
      class ON {}
      class ld extends Zi {
        constructor(e, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new jg(this));
          const i = (function Gt(t, e) {
            const n = t[Uh] || null;
            if (!n && !0 === e)
              throw new Error(
                `Type ${Ke(t)} does not have '\u0275mod' property.`
              );
            return n;
          })(e);
          (this._bootstrapComponents = (function rr(t) {
            return t instanceof Function ? t() : t;
          })(i.bootstrap)),
            (this._r3Injector = Mg(
              e,
              n,
              [
                { provide: Zi, useValue: this },
                { provide: wa, useValue: this.componentFactoryResolver },
                ...r,
              ],
              Ke(e),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(e));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const e = this._r3Injector;
          !e.destroyed && e.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(e) {
          this.destroyCbs.push(e);
        }
      }
      class ud extends ON {
        constructor(e) {
          super(), (this.moduleType = e);
        }
        create(e) {
          return new ld(this.moduleType, e, []);
        }
      }
      function dd(t) {
        return (e) => {
          setTimeout(t, void 0, e);
        };
      }
      const yt = class uF extends ct {
        constructor(e = !1) {
          super(), (this.__isAsync = e);
        }
        emit(e) {
          super.next(e);
        }
        subscribe(e, n, r) {
          let i = e,
            o = n || (() => null),
            s = r;
          if (e && "object" == typeof e) {
            const l = e;
            (i = l.next?.bind(l)),
              (o = l.error?.bind(l)),
              (s = l.complete?.bind(l));
          }
          this.__isAsync && ((o = dd(o)), i && (i = dd(i)), s && (s = dd(s)));
          const a = super.subscribe({ next: i, error: o, complete: s });
          return e instanceof de && e.add(a), a;
        }
      };
      let sr = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = hF), t;
      })();
      const dF = sr,
        fF = class extends dF {
          constructor(e, n, r) {
            super(),
              (this._declarationLView = e),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(e, n) {
            return this.createEmbeddedViewImpl(e, n, null);
          }
          createEmbeddedViewImpl(e, n, r) {
            const i = this._declarationTContainer.tView,
              o = Sa(
                this._declarationLView,
                i,
                e,
                16,
                null,
                i.declTNode,
                null,
                null,
                null,
                n || null,
                r || null
              );
            o[po] = this._declarationLView[this._declarationTContainer.index];
            const a = this._declarationLView[An];
            return (
              null !== a && (o[An] = a.createEmbeddedView(i)),
              Lc(i, o, e),
              new Vo(o)
            );
          }
        };
      function hF() {
        return (function qa(t, e) {
          return 4 & t.type ? new fF(e, t, xi(t, e)) : null;
        })(st(), D());
      }
      let Un = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = DF), t;
      })();
      function DF() {
        return (function Y_(t, e) {
          let n;
          const r = e[t.index];
          return (
            Pt(r)
              ? (n = r)
              : ((n = Rg(r, e, null, t)), (e[t.index] = n), Ia(e, n)),
            X_(n, e, t, r),
            new Z_(n, t, e)
          );
        })(st(), D());
      }
      const EF = Un,
        Z_ = class extends EF {
          constructor(e, n, r) {
            super(),
              (this._lContainer = e),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return xi(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Di(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const e = Nu(this._hostTNode, this._hostLView);
            if (Vp(e)) {
              const n = Ws(e, this._hostLView),
                r = qs(e);
              return new Di(n[w].data[r + 8], n);
            }
            return new Di(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(e) {
            const n = Q_(this._lContainer);
            return (null !== n && n[e]) || null;
          }
          get length() {
            return this._lContainer.length - ot;
          }
          createEmbeddedView(e, n, r) {
            let i, o;
            "number" == typeof r
              ? (i = r)
              : null != r && ((i = r.index), (o = r.injector));
            const a = e.createEmbeddedViewImpl(n || {}, o, null);
            return this.insertImpl(a, i, false), a;
          }
          createComponent(e, n, r, i, o) {
            const s =
              e &&
              !(function Do(t) {
                return "function" == typeof t;
              })(e);
            let a;
            if (s) a = n;
            else {
              const m = n || {};
              (a = m.index),
                (r = m.injector),
                (i = m.projectableNodes),
                (o = m.environmentInjector || m.ngModuleRef);
            }
            const l = s ? e : new Bo(ue(e)),
              u = r || this.parentInjector;
            if (!o && null == l.ngModule) {
              const y = (s ? u : this.parentInjector).get(Fi, null);
              y && (o = y);
            }
            ue(l.componentType ?? {});
            const h = l.create(u, i, null, o);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(e, n) {
            return this.insertImpl(e, n, !1);
          }
          insertImpl(e, n, r) {
            const i = e._lView,
              o = i[w];
            if (
              (function uM(t) {
                return Pt(t[Oe]);
              })(i)
            ) {
              const l = this.indexOf(e);
              if (-1 !== l) this.detach(l);
              else {
                const u = i[Oe],
                  c = new Z_(u, u[ft], u[Oe]);
                c.detach(c.indexOf(e));
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer;
            if (
              ((function LS(t, e, n, r) {
                const i = ot + r,
                  o = n.length;
                r > 0 && (n[i - 1][gn] = e),
                  r < o - ot
                    ? ((e[gn] = n[i]), Qp(n, ot + r, e))
                    : (n.push(e), (e[gn] = null)),
                  (e[Oe] = n);
                const s = e[po];
                null !== s &&
                  n !== s &&
                  (function VS(t, e) {
                    const n = t[mi];
                    e[ze] !== e[Oe][Oe][ze] && (t[rp] = !0),
                      null === n ? (t[mi] = [e]) : n.push(e);
                  })(s, e);
                const a = e[An];
                null !== a && a.insertView(t), (e[K] |= 128);
              })(o, i, a, s),
              !r)
            ) {
              const l = Xu(s, a),
                u = i[q],
                c = la(u, a[Nn]);
              null !== c &&
                (function RS(t, e, n, r, i, o) {
                  (r[Ze] = i), (r[ft] = e), Io(t, r, n, 1, i, o);
                })(o, a[ft], u, i, c, l);
            }
            return e.attachToViewContainerRef(), Qp(pd(a), s, e), e;
          }
          move(e, n) {
            return this.insert(e, n);
          }
          indexOf(e) {
            const n = Q_(this._lContainer);
            return null !== n ? n.indexOf(e) : -1;
          }
          remove(e) {
            const n = this._adjustIndex(e, -1),
              r = Ku(this._lContainer, n);
            r && (Xs(pd(this._lContainer), n), vm(r[w], r));
          }
          detach(e) {
            const n = this._adjustIndex(e, -1),
              r = Ku(this._lContainer, n);
            return r && null != Xs(pd(this._lContainer), n) ? new Vo(r) : null;
          }
          _adjustIndex(e, n = 0) {
            return e ?? this.length + n;
          }
        };
      function Q_(t) {
        return t[Ps];
      }
      function pd(t) {
        return t[Ps] || (t[Ps] = []);
      }
      let X_ = function J_(t, e, n, r) {
        if (t[Nn]) return;
        let i;
        (i =
          8 & n.type
            ? Ie(r)
            : (function bF(t, e) {
                const n = t[q],
                  r = n.createComment(""),
                  i = kt(e, t);
                return (
                  jr(
                    n,
                    la(n, i),
                    r,
                    (function US(t, e) {
                      return t.nextSibling(e);
                    })(n, i),
                    !1
                  ),
                  r
                );
              })(e, n)),
          (t[Nn] = i);
      };
      const nO = new C("Application Initializer");
      let Cd = (() => {
        class t {
          constructor() {
            (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((n, r) => {
                (this.resolve = n), (this.reject = r);
              })),
              (this.appInits = ve(nO, { optional: !0 }) ?? []);
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [];
            for (const i of this.appInits) {
              const o = i();
              if (Va(o)) n.push(o);
              else if (cy(o)) {
                const s = new Promise((a, l) => {
                  o.subscribe({ complete: a, error: l });
                });
                n.push(s);
              }
            }
            const r = () => {
              (this.done = !0), this.resolve();
            };
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((i) => {
                this.reject(i);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const $n = new C("LocaleId", {
        providedIn: "root",
        factory: () =>
          ve($n, H.Optional | H.SkipSelf) ||
          (function iO() {
            return (typeof $localize < "u" && $localize.locale) || Ki;
          })(),
      });
      let sO = (() => {
        class t {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new We(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const n = this.taskId++;
            return this.pendingTasks.add(n), n;
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const cO = (() => Promise.resolve(0))();
      function Md(t) {
        typeof Zone > "u"
          ? cO.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      function Cv(...t) {}
      class Be {
        constructor({
          enableLongStackTrace: e = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new yt(!1)),
            (this.onMicrotaskEmpty = new yt(!1)),
            (this.onStable = new yt(!1)),
            (this.onError = new yt(!1)),
            typeof Zone > "u")
          )
            throw new _(908, !1);
          Zone.assertZonePatched();
          const i = this;
          (i._nesting = 0),
            (i._outer = i._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
            e &&
              Zone.longStackTraceZoneSpec &&
              (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
            (i.shouldCoalesceEventChangeDetection = !r && n),
            (i.shouldCoalesceRunChangeDetection = r),
            (i.lastRequestAnimationFrameId = -1),
            (i.nativeRequestAnimationFrame = (function dO() {
              let t = Ce.requestAnimationFrame,
                e = Ce.cancelAnimationFrame;
              if (typeof Zone < "u" && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function pO(t) {
              const e = () => {
                !(function hO(t) {
                  t.isCheckStableRunning ||
                    -1 !== t.lastRequestAnimationFrameId ||
                    ((t.lastRequestAnimationFrameId =
                      t.nativeRequestAnimationFrame.call(Ce, () => {
                        t.fakeTopEventTask ||
                          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (t.lastRequestAnimationFrameId = -1),
                                Id(t),
                                (t.isCheckStableRunning = !0),
                                Sd(t),
                                (t.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          t.fakeTopEventTask.invoke();
                      })),
                    Id(t));
                })(t);
              };
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, i, o, s, a) => {
                  try {
                    return Mv(t), n.invokeTask(i, o, s, a);
                  } finally {
                    ((t.shouldCoalesceEventChangeDetection &&
                      "eventTask" === o.type) ||
                      t.shouldCoalesceRunChangeDetection) &&
                      e(),
                      Sv(t);
                  }
                },
                onInvoke: (n, r, i, o, s, a, l) => {
                  try {
                    return Mv(t), n.invoke(i, o, s, a, l);
                  } finally {
                    t.shouldCoalesceRunChangeDetection && e(), Sv(t);
                  }
                },
                onHasTask: (n, r, i, o) => {
                  n.hasTask(i, o),
                    r === i &&
                      ("microTask" == o.change
                        ? ((t._hasPendingMicrotasks = o.microTask),
                          Id(t),
                          Sd(t))
                        : "macroTask" == o.change &&
                          (t.hasPendingMacrotasks = o.macroTask));
                },
                onHandleError: (n, r, i, o) => (
                  n.handleError(i, o),
                  t.runOutsideAngular(() => t.onError.emit(o)),
                  !1
                ),
              });
            })(i);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Be.isInAngularZone()) throw new _(909, !1);
        }
        static assertNotInAngularZone() {
          if (Be.isInAngularZone()) throw new _(909, !1);
        }
        run(e, n, r) {
          return this._inner.run(e, n, r);
        }
        runTask(e, n, r, i) {
          const o = this._inner,
            s = o.scheduleEventTask("NgZoneEvent: " + i, e, fO, Cv, Cv);
          try {
            return o.runTask(s, n, r);
          } finally {
            o.cancelTask(s);
          }
        }
        runGuarded(e, n, r) {
          return this._inner.runGuarded(e, n, r);
        }
        runOutsideAngular(e) {
          return this._outer.run(e);
        }
      }
      const fO = {};
      function Sd(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Id(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          ((t.shouldCoalesceEventChangeDetection ||
            t.shouldCoalesceRunChangeDetection) &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Mv(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Sv(t) {
        t._nesting--, Sd(t);
      }
      class mO {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new yt()),
            (this.onMicrotaskEmpty = new yt()),
            (this.onStable = new yt()),
            (this.onError = new yt());
        }
        run(e, n, r) {
          return e.apply(n, r);
        }
        runGuarded(e, n, r) {
          return e.apply(n, r);
        }
        runOutsideAngular(e) {
          return e();
        }
        runTask(e, n, r, i) {
          return e.apply(n, r);
        }
      }
      const Iv = new C("", { providedIn: "root", factory: Tv });
      function Tv() {
        const t = ve(Be);
        let e = !0;
        return (function aC(...t) {
          const e = so(t),
            n = (function eC(t, e) {
              return "number" == typeof Yl(t) ? t.pop() : e;
            })(t, 1 / 0),
            r = t;
          return r.length ? (1 === r.length ? nn(r[0]) : Ah(n)(li(r, e))) : Ql;
        })(
          new Fe((i) => {
            (e =
              t.isStable && !t.hasPendingMacrotasks && !t.hasPendingMicrotasks),
              t.runOutsideAngular(() => {
                i.next(e), i.complete();
              });
          }),
          new Fe((i) => {
            let o;
            t.runOutsideAngular(() => {
              o = t.onStable.subscribe(() => {
                Be.assertNotInAngularZone(),
                  Md(() => {
                    !e &&
                      !t.hasPendingMacrotasks &&
                      !t.hasPendingMicrotasks &&
                      ((e = !0), i.next(!0));
                  });
              });
            });
            const s = t.onUnstable.subscribe(() => {
              Be.assertInAngularZone(),
                e &&
                  ((e = !1),
                  t.runOutsideAngular(() => {
                    i.next(!1);
                  }));
            });
            return () => {
              o.unsubscribe(), s.unsubscribe();
            };
          }).pipe(Xl())
        );
      }
      const Av = new C(""),
        Ka = new C("");
      let Nd,
        Td = (() => {
          class t {
            constructor(n, r, i) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Nd ||
                  ((function gO(t) {
                    Nd = t;
                  })(i),
                  i.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Be.assertNotInAngularZone(),
                        Md(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Md(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, i) {
              let o = -1;
              r &&
                r > 0 &&
                (o = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== o
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: o, updateCb: i });
            }
            whenStable(n, r, i) {
              if (i && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, i), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, i) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(F(Be), F(Ad), F(Ka));
            }),
            (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ad = (() => {
          class t {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Nd?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = ee({
              token: t,
              factory: t.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })(),
        wr = null;
      const Nv = new C("AllowMultipleToken"),
        Fd = new C("PlatformDestroyListeners"),
        Fv = new C("appBootstrapListener");
      function Rv(t, e, n = []) {
        const r = `Platform: ${e}`,
          i = new C(r);
        return (o = []) => {
          let s = Od();
          if (!s || s.injector.get(Nv, !1)) {
            const a = [...n, ...o, { provide: i, useValue: !0 }];
            t
              ? t(a)
              : (function vO(t) {
                  if (wr && !wr.get(Nv, !1)) throw new _(400, !1);
                  (function Ov() {
                    !(function XC(t) {
                      up = t;
                    })(() => {
                      throw new _(600, !1);
                    });
                  })(),
                    (wr = t);
                  const e = t.get(kv);
                  (function xv(t) {
                    t.get(Jm, null)?.forEach((n) => n());
                  })(t);
                })(
                  (function Pv(t = [], e) {
                    return ir.create({
                      name: e,
                      providers: [
                        { provide: uc, useValue: "platform" },
                        { provide: Fd, useValue: new Set([() => (wr = null)]) },
                        ...t,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function EO(t) {
            const e = Od();
            if (!e) throw new _(401, !1);
            return e;
          })();
        };
      }
      function Od() {
        return wr?.get(kv) ?? null;
      }
      let kv = (() => {
        class t {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const i = (function bO(t = "zone.js", e) {
              return "noop" === t ? new mO() : "zone.js" === t ? new Be(e) : t;
            })(
              r?.ngZone,
              (function Lv(t) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            );
            return i.run(() => {
              const o = (function RN(t, e, n) {
                  return new ld(t, e, n);
                })(
                  n.moduleType,
                  this.injector,
                  (function Uv(t) {
                    return [
                      { provide: Be, useFactory: t },
                      {
                        provide: ma,
                        multi: !0,
                        useFactory: () => {
                          const e = ve(CO, { optional: !0 });
                          return () => e.initialize();
                        },
                      },
                      { provide: jv, useFactory: wO },
                      { provide: Iv, useFactory: Tv },
                    ];
                  })(() => i)
                ),
                s = o.injector.get(kn, null);
              return (
                i.runOutsideAngular(() => {
                  const a = i.onError.subscribe({
                    next: (l) => {
                      s.handleError(l);
                    },
                  });
                  o.onDestroy(() => {
                    Za(this._modules, o), a.unsubscribe();
                  });
                }),
                (function Vv(t, e, n) {
                  try {
                    const r = n();
                    return Va(r)
                      ? r.catch((i) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(i)), i)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(s, i, () => {
                  const a = o.injector.get(Cd);
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function u_(t) {
                          rn(t, "Expected localeId to be defined"),
                            "string" == typeof t &&
                              (l_ = t.toLowerCase().replace(/_/g, "-"));
                        })(o.injector.get($n, Ki) || Ki),
                        this._moduleDoBootstrap(o),
                        o
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const i = Bv({}, r);
            return (function yO(t, e, n) {
              const r = new ud(n);
              return Promise.resolve(r);
            })(0, 0, n).then((o) => this.bootstrapModuleFactory(o, i));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(Xi);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((i) => r.bootstrap(i));
            else {
              if (!n.instance.ngDoBootstrap) throw new _(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new _(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Fd, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(ir));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "platform" })),
          t
        );
      })();
      function Bv(t, e) {
        return Array.isArray(e) ? e.reduce(Bv, t) : { ...t, ...e };
      }
      let Xi = (() => {
        class t {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = ve(jv)),
              (this.zoneIsStable = ve(Iv)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = ve(sO).hasPendingTasks.pipe(
                (function lC(t, e) {
                  return ye((n, r) => {
                    let i = null,
                      o = 0,
                      s = !1;
                    const a = () => s && !i && r.complete();
                    n.subscribe(
                      Te(
                        r,
                        (l) => {
                          i?.unsubscribe();
                          let u = 0;
                          const c = o++;
                          nn(t(l, c)).subscribe(
                            (i = Te(
                              r,
                              (d) => r.next(e ? e(l, d, c, u++) : d),
                              () => {
                                (i = null), a();
                              }
                            ))
                          );
                        },
                        () => {
                          (s = !0), a();
                        }
                      )
                    );
                  });
                })((n) => (n ? Rr(!1) : this.zoneIsStable)),
                (function uC(t, e = Ct) {
                  return (
                    (t = t ?? cC),
                    ye((n, r) => {
                      let i,
                        o = !0;
                      n.subscribe(
                        Te(r, (s) => {
                          const a = e(s);
                          (o || !t(i, a)) && ((o = !1), (i = a), r.next(s));
                        })
                      );
                    })
                  );
                })(),
                Xl()
              )),
              (this._injector = ve(Fi));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(n, r) {
            const i = n instanceof sg;
            if (!this._injector.get(Cd).done)
              throw (
                (!i &&
                  (function fo(t) {
                    const e = ue(t) || dt(t) || Rt(t);
                    return null !== e && e.standalone;
                  })(n),
                new _(405, !1))
              );
            let s;
            (s = i ? n : this._injector.get(wa).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function _O(t) {
                return t.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get(Zi),
              u = s.create(ir.NULL, [], r || s.selector, a),
              c = u.location.nativeElement,
              d = u.injector.get(Av, null);
            return (
              d?.registerApplication(c),
              u.onDestroy(() => {
                this.detachView(u.hostView),
                  Za(this.components, u),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(u),
              u
            );
          }
          tick() {
            if (this._runningTick) throw new _(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this.internalErrorHandler(n);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            Za(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(Fv, []);
            r.push(...this._bootstrapListeners), r.forEach((i) => i(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => Za(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new _(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function Za(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const jv = new C("", {
        providedIn: "root",
        factory: () => ve(kn).handleError.bind(void 0),
      });
      function wO() {
        const t = ve(Be),
          e = ve(kn);
        return (n) => t.runOutsideAngular(() => e.handleError(n));
      }
      let CO = (() => {
        class t {
          constructor() {
            (this.zone = ve(Be)), (this.applicationRef = ve(Xi));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class Wv {
        constructor() {}
        supports(e) {
          return Fa(e);
        }
        create(e) {
          return new xO(e);
        }
      }
      const OO = (t, e) => e;
      class xO {
        constructor(e) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = e || OO);
        }
        forEachItem(e) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) e(n);
        }
        forEachOperation(e) {
          let n = this._itHead,
            r = this._removalsHead,
            i = 0,
            o = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Zv(r, i, o)) ? n : r,
              a = Zv(s, i, o),
              l = s.currentIndex;
            if (s === r) i--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) i++;
            else {
              o || (o = []);
              const u = a - i,
                c = l - i;
              if (u != c) {
                for (let f = 0; f < u; f++) {
                  const h = f < o.length ? o[f] : (o[f] = 0),
                    p = h + f;
                  c <= p && p < u && (o[f] = h + 1);
                }
                o[s.previousIndex] = c - u;
              }
            }
            a !== l && e(s, a, l);
          }
        }
        forEachPreviousItem(e) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) e(n);
        }
        forEachAddedItem(e) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) e(n);
        }
        forEachMovedItem(e) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) e(n);
        }
        forEachRemovedItem(e) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) e(n);
        }
        forEachIdentityChange(e) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            e(n);
        }
        diff(e) {
          if ((null == e && (e = []), !Fa(e))) throw new _(900, !1);
          return this.check(e) ? this : null;
        }
        onDestroy() {}
        check(e) {
          this._reset();
          let i,
            o,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(e)) {
            this.length = e.length;
            for (let a = 0; a < this.length; a++)
              (o = e[a]),
                (s = this._trackByFn(a, o)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, o, s, a)),
                    Object.is(n.item, o) || this._addIdentityChange(n, o))
                  : ((n = this._mismatch(n, o, s, a)), (r = !0)),
                (n = n._next);
          } else
            (i = 0),
              (function fT(t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(e, (a) => {
                (s = this._trackByFn(i, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, i)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, i)), (r = !0)),
                  (n = n._next),
                  i++;
              }),
              (this.length = i);
          return this._truncate(n), (this.collection = e), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let e;
            for (
              e = this._previousItHead = this._itHead;
              null !== e;
              e = e._next
            )
              e._nextPrevious = e._next;
            for (e = this._additionsHead; null !== e; e = e._nextAdded)
              e.previousIndex = e.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                e = this._movesHead;
              null !== e;
              e = e._nextMoved
            )
              e.previousIndex = e.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(e, n, r, i) {
          let o;
          return (
            null === e ? (o = this._itTail) : ((o = e._prev), this._remove(e)),
            null !==
            (e =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._reinsertAfter(e, o, i))
              : null !==
                (e =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, i))
              ? (Object.is(e.item, n) || this._addIdentityChange(e, n),
                this._moveAfter(e, o, i))
              : (e = this._addAfter(new RO(n, r), o, i)),
            e
          );
        }
        _verifyReinsertion(e, n, r, i) {
          let o =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== o
              ? (e = this._reinsertAfter(o, e._prev, i))
              : e.currentIndex != i &&
                ((e.currentIndex = i), this._addToMoves(e, i)),
            e
          );
        }
        _truncate(e) {
          for (; null !== e; ) {
            const n = e._next;
            this._addToRemovals(this._unlink(e)), (e = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(e, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(e);
          const i = e._prevRemoved,
            o = e._nextRemoved;
          return (
            null === i ? (this._removalsHead = o) : (i._nextRemoved = o),
            null === o ? (this._removalsTail = i) : (o._prevRemoved = i),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _moveAfter(e, n, r) {
          return (
            this._unlink(e),
            this._insertAfter(e, n, r),
            this._addToMoves(e, r),
            e
          );
        }
        _addAfter(e, n, r) {
          return (
            this._insertAfter(e, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = e)
                : (this._additionsTail._nextAdded = e)),
            e
          );
        }
        _insertAfter(e, n, r) {
          const i = null === n ? this._itHead : n._next;
          return (
            (e._next = i),
            (e._prev = n),
            null === i ? (this._itTail = e) : (i._prev = e),
            null === n ? (this._itHead = e) : (n._next = e),
            null === this._linkedRecords && (this._linkedRecords = new Kv()),
            this._linkedRecords.put(e),
            (e.currentIndex = r),
            e
          );
        }
        _remove(e) {
          return this._addToRemovals(this._unlink(e));
        }
        _unlink(e) {
          null !== this._linkedRecords && this._linkedRecords.remove(e);
          const n = e._prev,
            r = e._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            e
          );
        }
        _addToMoves(e, n) {
          return (
            e.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = e)
                  : (this._movesTail._nextMoved = e)),
            e
          );
        }
        _addToRemovals(e) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new Kv()),
            this._unlinkedRecords.put(e),
            (e.currentIndex = null),
            (e._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = e),
                (e._prevRemoved = null))
              : ((e._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = e)),
            e
          );
        }
        _addIdentityChange(e, n) {
          return (
            (e.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = e)
                : (this._identityChangesTail._nextIdentityChange = e)),
            e
          );
        }
      }
      class RO {
        constructor(e, n) {
          (this.item = e),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class PO {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(e) {
          null === this._head
            ? ((this._head = this._tail = e),
              (e._nextDup = null),
              (e._prevDup = null))
            : ((this._tail._nextDup = e),
              (e._prevDup = this._tail),
              (e._nextDup = null),
              (this._tail = e));
        }
        get(e, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, e)
            )
              return r;
          return null;
        }
        remove(e) {
          const n = e._prevDup,
            r = e._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class Kv {
        constructor() {
          this.map = new Map();
        }
        put(e) {
          const n = e.trackById;
          let r = this.map.get(n);
          r || ((r = new PO()), this.map.set(n, r)), r.add(e);
        }
        get(e, n) {
          const i = this.map.get(e);
          return i ? i.get(e, n) : null;
        }
        remove(e) {
          const n = e.trackById;
          return this.map.get(n).remove(e) && this.map.delete(n), e;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Zv(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let i = 0;
        return n && r < n.length && (i = n[r]), r + e + i;
      }
      function Yv() {
        return new Xa([new Wv()]);
      }
      let Xa = (() => {
        class t {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const i = r.factories.slice();
              n = n.concat(i);
            }
            return new t(n);
          }
          static extend(n) {
            return {
              provide: t,
              useFactory: (r) => t.create(n, r || Yv()),
              deps: [[t, new ea(), new Si()]],
            };
          }
          find(n) {
            const r = this.factories.find((i) => i.supports(n));
            if (null != r) return r;
            throw new _(901, !1);
          }
        }
        return (t.ɵprov = ee({ token: t, providedIn: "root", factory: Yv })), t;
      })();
      const HO = Rv(null, "core", []);
      let jO = (() => {
          class t {
            constructor(n) {}
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(F(Xi));
            }),
            (t.ɵmod = on({ type: t })),
            (t.ɵinj = zt({})),
            t
          );
        })(),
        Hd = null;
      function ns() {
        return Hd;
      }
      class XO {}
      const lt = new C("DocumentToken");
      class Hx {
        constructor(e, n, r, i) {
          (this.$implicit = e),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = i);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let mD = (() => {
        class t {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, i) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = i),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((i, o, s) => {
              if (null == i.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new Hx(i.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === o ? void 0 : o);
              else if (null !== o) {
                const a = r.get(o);
                r.move(a, s), gD(a, i);
              }
            });
            for (let i = 0, o = r.length; i < o; i++) {
              const a = r.get(i).context;
              (a.index = i), (a.count = o), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((i) => {
              gD(r.get(i.currentIndex), i);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(E(Un), E(sr), E(Xa));
          }),
          (t.ɵdir = G({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          t
        );
      })();
      function gD(t, e) {
        t.context.$implicit = e.item;
      }
      let yD = (() => {
        class t {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new jx()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            _D("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            _D("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(E(Un), E(sr));
          }),
          (t.ɵdir = G({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          t
        );
      })();
      class jx {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function _D(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${Ke(e)}'.`
          );
      }
      let fR = (() => {
        class t {}
        return (
          (t.ɵfac = function (n) {
            return new (n || t)();
          }),
          (t.ɵmod = on({ type: t })),
          (t.ɵinj = zt({})),
          t
        );
      })();
      const ED = "browser";
      function bD(t) {
        return "server" === t;
      }
      class GR extends XO {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class rf extends GR {
        static makeCurrent() {
          !(function YO(t) {
            Hd || (Hd = t);
          })(new rf());
        }
        onAndCancel(e, n, r) {
          return (
            e.addEventListener(n, r),
            () => {
              e.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(e, n) {
          e.dispatchEvent(n);
        }
        remove(e) {
          e.parentNode && e.parentNode.removeChild(e);
        }
        createElement(e, n) {
          return (n = n || this.getDefaultDocument()).createElement(e);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(e) {
          return e.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(e) {
          return e instanceof DocumentFragment;
        }
        getGlobalEventTarget(e, n) {
          return "window" === n
            ? window
            : "document" === n
            ? e
            : "body" === n
            ? e.body
            : null;
        }
        getBaseHref(e) {
          const n = (function qR() {
            return (
              (ss = ss || document.querySelector("base")),
              ss ? ss.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function WR(t) {
                (fl = fl || document.createElement("a")),
                  fl.setAttribute("href", t);
                const e = fl.pathname;
                return "/" === e.charAt(0) ? e : `/${e}`;
              })(n);
        }
        resetBaseElement() {
          ss = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(e) {
          return (function Lx(t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const r = n.indexOf("="),
                [i, o] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (i.trim() === e) return decodeURIComponent(o);
            }
            return null;
          })(document.cookie, e);
        }
      }
      let fl,
        ss = null,
        ZR = (() => {
          class t {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const sf = new C("EventManagerPlugins");
      let TD = (() => {
        class t {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((i) => {
                i.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, i) {
            return this._findPluginFor(r).addEventListener(n, r, i);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n);
            if (r) return r;
            if (((r = this._plugins.find((o) => o.supports(n))), !r))
              throw new _(5101, !1);
            return this._eventNameToPlugin.set(n, r), r;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(sf), F(Be));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class AD {
        constructor(e) {
          this._doc = e;
        }
      }
      const af = "ng-app-id";
      let ND = (() => {
        class t {
          constructor(n, r, i, o = {}) {
            (this.doc = n),
              (this.appId = r),
              (this.nonce = i),
              (this.platformId = o),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = bD(o)),
              this.resetHostNodes();
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM;
            n && (n.forEach((r) => r.remove()), n.clear());
            for (const r of this.getAllStyles()) this.onStyleRemoved(r);
            this.resetHostNodes();
          }
          addHost(n) {
            this.hostNodes.add(n);
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
          }
          removeHost(n) {
            this.hostNodes.delete(n);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n);
          }
          onStyleRemoved(n) {
            const r = this.styleRef;
            r.get(n)?.elements?.forEach((i) => i.remove()), r.delete(n);
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${af}="${this.appId}"]`
            );
            if (n?.length) {
              const r = new Map();
              return (
                n.forEach((i) => {
                  null != i.textContent && r.set(i.textContent, i);
                }),
                r
              );
            }
            return null;
          }
          changeUsageCount(n, r) {
            const i = this.styleRef;
            if (i.has(n)) {
              const o = i.get(n);
              return (o.usage += r), o.usage;
            }
            return i.set(n, { usage: r, elements: [] }), r;
          }
          getStyleElement(n, r) {
            const i = this.styleNodesInDOM,
              o = i?.get(r);
            if (o?.parentNode === n)
              return i.delete(r), o.removeAttribute(af), o;
            {
              const s = this.doc.createElement("style");
              return (
                this.nonce && s.setAttribute("nonce", this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(af, this.appId),
                s
              );
            }
          }
          addStyleToHost(n, r) {
            const i = this.getStyleElement(n, r);
            n.appendChild(i);
            const o = this.styleRef,
              s = o.get(r)?.elements;
            s ? s.push(i) : o.set(r, { elements: [i], usage: 1 });
          }
          resetHostNodes() {
            const n = this.hostNodes;
            n.clear(), n.add(this.doc.head);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(lt), F(_a), F(pc, 8), F(zr));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const lf = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        uf = /%COMP%/g,
        JR = new C("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function OD(t, e) {
        return e.map((n) => n.replace(uf, t));
      }
      let cf = (() => {
        class t {
          constructor(n, r, i, o, s, a, l, u = null) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = i),
              (this.removeStylesOnCompDestory = o),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = l),
              (this.nonce = u),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = bD(a)),
              (this.defaultRenderer = new df(n, s, l, this.platformIsServer));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            this.platformIsServer &&
              r.encapsulation === Ot.ShadowDom &&
              (r = { ...r, encapsulation: Ot.Emulated });
            const i = this.getOrCreateRenderer(n, r);
            return (
              i instanceof RD
                ? i.applyToHost(n)
                : i instanceof ff && i.applyStyles(),
              i
            );
          }
          getOrCreateRenderer(n, r) {
            const i = this.rendererByCompId;
            let o = i.get(r.id);
            if (!o) {
              const s = this.doc,
                a = this.ngZone,
                l = this.eventManager,
                u = this.sharedStylesHost,
                c = this.removeStylesOnCompDestory,
                d = this.platformIsServer;
              switch (r.encapsulation) {
                case Ot.Emulated:
                  o = new RD(l, u, r, this.appId, c, s, a, d);
                  break;
                case Ot.ShadowDom:
                  return new rP(l, u, n, r, s, a, this.nonce, d);
                default:
                  o = new ff(l, u, r, c, s, a, d);
              }
              (o.onDestroy = () => i.delete(r.id)), i.set(r.id, o);
            }
            return o;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(
              F(TD),
              F(ND),
              F(_a),
              F(JR),
              F(lt),
              F(zr),
              F(Be),
              F(pc)
            );
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class df {
        constructor(e, n, r, i) {
          (this.eventManager = e),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = i),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(e, n) {
          return n
            ? this.doc.createElementNS(lf[n] || n, e)
            : this.doc.createElement(e);
        }
        createComment(e) {
          return this.doc.createComment(e);
        }
        createText(e) {
          return this.doc.createTextNode(e);
        }
        appendChild(e, n) {
          (xD(e) ? e.content : e).appendChild(n);
        }
        insertBefore(e, n, r) {
          e && (xD(e) ? e.content : e).insertBefore(n, r);
        }
        removeChild(e, n) {
          e && e.removeChild(n);
        }
        selectRootElement(e, n) {
          let r = "string" == typeof e ? this.doc.querySelector(e) : e;
          if (!r) throw new _(5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(e) {
          return e.parentNode;
        }
        nextSibling(e) {
          return e.nextSibling;
        }
        setAttribute(e, n, r, i) {
          if (i) {
            n = i + ":" + n;
            const o = lf[i];
            o ? e.setAttributeNS(o, n, r) : e.setAttribute(n, r);
          } else e.setAttribute(n, r);
        }
        removeAttribute(e, n, r) {
          if (r) {
            const i = lf[r];
            i ? e.removeAttributeNS(i, n) : e.removeAttribute(`${r}:${n}`);
          } else e.removeAttribute(n);
        }
        addClass(e, n) {
          e.classList.add(n);
        }
        removeClass(e, n) {
          e.classList.remove(n);
        }
        setStyle(e, n, r, i) {
          i & (Vt.DashCase | Vt.Important)
            ? e.style.setProperty(n, r, i & Vt.Important ? "important" : "")
            : (e.style[n] = r);
        }
        removeStyle(e, n, r) {
          r & Vt.DashCase ? e.style.removeProperty(n) : (e.style[n] = "");
        }
        setProperty(e, n, r) {
          e[n] = r;
        }
        setValue(e, n) {
          e.nodeValue = n;
        }
        listen(e, n, r) {
          if (
            "string" == typeof e &&
            !(e = ns().getGlobalEventTarget(this.doc, e))
          )
            throw new Error(`Unsupported event target ${e} for event ${n}`);
          return this.eventManager.addEventListener(
            e,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(e) {
          return (n) => {
            if ("__ngUnwrap__" === n) return e;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => e(n))
                : e(n)) && n.preventDefault();
          };
        }
      }
      function xD(t) {
        return "TEMPLATE" === t.tagName && void 0 !== t.content;
      }
      class rP extends df {
        constructor(e, n, r, i, o, s, a, l) {
          super(e, o, s, l),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const u = OD(i.id, i.styles);
          for (const c of u) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = c),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(e) {
          return e === this.hostEl ? this.shadowRoot : e;
        }
        appendChild(e, n) {
          return super.appendChild(this.nodeOrShadowRoot(e), n);
        }
        insertBefore(e, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(e), n, r);
        }
        removeChild(e, n) {
          return super.removeChild(this.nodeOrShadowRoot(e), n);
        }
        parentNode(e) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(e))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class ff extends df {
        constructor(e, n, r, i, o, s, a, l) {
          super(e, o, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = i),
            (this.rendererUsageCount = 0),
            (this.styles = l ? OD(l, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class RD extends ff {
        constructor(e, n, r, i, o, s, a, l) {
          const u = i + "-" + r.id;
          super(e, n, r, o, s, a, l, u),
            (this.contentAttr = (function eP(t) {
              return "_ngcontent-%COMP%".replace(uf, t);
            })(u)),
            (this.hostAttr = (function tP(t) {
              return "_nghost-%COMP%".replace(uf, t);
            })(u));
        }
        applyToHost(e) {
          this.applyStyles(), this.setAttribute(e, this.hostAttr, "");
        }
        createElement(e, n) {
          const r = super.createElement(e, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let iP = (() => {
        class t extends AD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, i) {
            return (
              n.addEventListener(r, i, !1),
              () => this.removeEventListener(n, r, i)
            );
          }
          removeEventListener(n, r, i) {
            return n.removeEventListener(r, i);
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(lt));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const PD = ["alt", "control", "meta", "shift"],
        oP = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        sP = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let aP = (() => {
        class t extends AD {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != t.parseEventName(n);
          }
          addEventListener(n, r, i) {
            const o = t.parseEventName(r),
              s = t.eventCallback(o.fullKey, i, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => ns().onAndCancel(n, o.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              i = r.shift();
            if (0 === r.length || ("keydown" !== i && "keyup" !== i))
              return null;
            const o = t._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              PD.forEach((u) => {
                const c = r.indexOf(u);
                c > -1 && (r.splice(c, 1), (s += u + "."));
              }),
              (s += o),
              0 != r.length || 0 === o.length)
            )
              return null;
            const l = {};
            return (l.domEventName = i), (l.fullKey = s), l;
          }
          static matchEventFullKeyCode(n, r) {
            let i = oP[n.key] || n.key,
              o = "";
            return (
              r.indexOf("code.") > -1 && ((i = n.code), (o = "code.")),
              !(null == i || !i) &&
                ((i = i.toLowerCase()),
                " " === i ? (i = "space") : "." === i && (i = "dot"),
                PD.forEach((s) => {
                  s !== i && (0, sP[s])(n) && (o += s + ".");
                }),
                (o += i),
                o === r)
            );
          }
          static eventCallback(n, r, i) {
            return (o) => {
              t.matchEventFullKeyCode(o, n) && i.runGuarded(() => r(o));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(lt));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const dP = Rv(HO, "browser", [
          { provide: zr, useValue: ED },
          {
            provide: Jm,
            useValue: function lP() {
              rf.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: lt,
            useFactory: function cP() {
              return (
                (function QS(t) {
                  tc = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        fP = new C(""),
        VD = [
          {
            provide: Ka,
            useClass: class KR {
              addToWindow(e) {
                (Ce.getAngularTestability = (r, i = !0) => {
                  const o = e.findTestabilityInTree(r, i);
                  if (null == o) throw new _(5103, !1);
                  return o;
                }),
                  (Ce.getAllAngularTestabilities = () =>
                    e.getAllTestabilities()),
                  (Ce.getAllAngularRootElements = () => e.getAllRootElements()),
                  Ce.frameworkStabilizers || (Ce.frameworkStabilizers = []),
                  Ce.frameworkStabilizers.push((r) => {
                    const i = Ce.getAllAngularTestabilities();
                    let o = i.length,
                      s = !1;
                    const a = function (l) {
                      (s = s || l), o--, 0 == o && r(s);
                    };
                    i.forEach(function (l) {
                      l.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(e, n, r) {
                return null == n
                  ? null
                  : e.getTestability(n) ??
                      (r
                        ? ns().isShadowRoot(n)
                          ? this.findTestabilityInTree(e, n.host, !0)
                          : this.findTestabilityInTree(e, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Av, useClass: Td, deps: [Be, Ad, Ka] },
          { provide: Td, useClass: Td, deps: [Be, Ad, Ka] },
        ],
        BD = [
          { provide: uc, useValue: "root" },
          {
            provide: kn,
            useFactory: function uP() {
              return new kn();
            },
            deps: [],
          },
          { provide: sf, useClass: iP, multi: !0, deps: [lt, Be, zr] },
          { provide: sf, useClass: aP, multi: !0, deps: [lt] },
          cf,
          ND,
          TD,
          { provide: Ro, useExisting: cf },
          { provide: class _R {}, useClass: ZR, deps: [] },
          [],
        ];
      let HD = (() => {
        class t {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: t,
              providers: [{ provide: _a, useValue: n.appId }],
            };
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(fP, 12));
          }),
          (t.ɵmod = on({ type: t })),
          (t.ɵinj = zt({ providers: [...BD, ...VD], imports: [fR, jO] })),
          t
        );
      })();
      typeof window < "u" && window;
      let pf = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = ee({
              token: t,
              factory: function (n) {
                let r = null;
                return (r = n ? new (n || t)() : F($D)), r;
              },
              providedIn: "root",
            })),
            t
          );
        })(),
        $D = (() => {
          class t extends pf {
            constructor(n) {
              super(), (this._doc = n);
            }
            sanitize(n, r) {
              if (null == r) return null;
              switch (n) {
                case ce.NONE:
                  return r;
                case ce.HTML:
                  return Pn(r, "HTML")
                    ? Kt(r)
                    : jm(this._doc, String(r)).toString();
                case ce.STYLE:
                  return Pn(r, "Style") ? Kt(r) : r;
                case ce.SCRIPT:
                  if (Pn(r, "Script")) return Kt(r);
                  throw new _(5200, !1);
                case ce.URL:
                  return Pn(r, "URL") ? Kt(r) : ha(String(r));
                case ce.RESOURCE_URL:
                  if (Pn(r, "ResourceURL")) return Kt(r);
                  throw new _(5201, !1);
                default:
                  throw new _(5202, !1);
              }
            }
            bypassSecurityTrustHtml(n) {
              return (function r0(t) {
                return new YS(t);
              })(n);
            }
            bypassSecurityTrustStyle(n) {
              return (function o0(t) {
                return new XS(t);
              })(n);
            }
            bypassSecurityTrustScript(n) {
              return (function s0(t) {
                return new JS(t);
              })(n);
            }
            bypassSecurityTrustUrl(n) {
              return (function a0(t) {
                return new e0(t);
              })(n);
            }
            bypassSecurityTrustResourceUrl(n) {
              return (function l0(t) {
                return new t0(t);
              })(n);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(F(lt));
            }),
            (t.ɵprov = ee({
              token: t,
              factory: function (n) {
                let r = null;
                return (
                  (r = n
                    ? new n()
                    : (function _P(t) {
                        return new $D(t.get(lt));
                      })(F(ir))),
                  r
                );
              },
              providedIn: "root",
            })),
            t
          );
        })();
      const { isArray: vP } = Array,
        { getPrototypeOf: DP, prototype: EP, keys: bP } = Object;
      function GD(t) {
        if (1 === t.length) {
          const e = t[0];
          if (vP(e)) return { args: e, keys: null };
          if (
            (function wP(t) {
              return t && "object" == typeof t && DP(t) === EP;
            })(e)
          ) {
            const n = bP(e);
            return { args: n.map((r) => e[r]), keys: n };
          }
        }
        return { args: t, keys: null };
      }
      const { isArray: CP } = Array;
      function qD(t) {
        return Ae((e) =>
          (function MP(t, e) {
            return CP(e) ? t(...e) : t(e);
          })(t, e)
        );
      }
      function WD(t, e) {
        return t.reduce((n, r, i) => ((n[r] = e[i]), n), {});
      }
      const eo = new C("CallSetDisabledState", {
          providedIn: "root",
          factory: () => _l,
        }),
        _l = "always";
      let PE = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = on({ type: t })),
            (t.ɵinj = zt({})),
            t
          );
        })(),
        bk = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = on({ type: t })),
            (t.ɵinj = zt({ imports: [PE] })),
            t
          );
        })(),
        Ck = (() => {
          class t {
            static withConfig(n) {
              return {
                ngModule: t,
                providers: [
                  { provide: eo, useValue: n.callSetDisabledState ?? _l },
                ],
              };
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = on({ type: t })),
            (t.ɵinj = zt({ imports: [bk] })),
            t
          );
        })();
      class JE {}
      class Mk {}
      const lr = "*";
      function eb(t, e = null) {
        return { type: 2, steps: t, options: e };
      }
      function tb(t) {
        return { type: 6, styles: t, offset: null };
      }
      function nb(t) {
        Promise.resolve().then(t);
      }
      class ds {
        constructor(e = 0, n = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = e + n);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        onStart(e) {
          this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
          this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          nb(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          (this._started = !1),
            (this._finished = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        setPosition(e) {
          this._position = this.totalTime ? e * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(e) {
          const n = "start" == e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class rb {
        constructor(e) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = e);
          let n = 0,
            r = 0,
            i = 0;
          const o = this.players.length;
          0 == o
            ? nb(() => this._onFinish())
            : this.players.forEach((s) => {
                s.onDone(() => {
                  ++n == o && this._onFinish();
                }),
                  s.onDestroy(() => {
                    ++r == o && this._onDestroy();
                  }),
                  s.onStart(() => {
                    ++i == o && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (s, a) => Math.max(s, a.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach((e) => e.init());
        }
        onStart(e) {
          this._onStartFns.push(e);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach((e) => e()),
            (this._onStartFns = []));
        }
        onDone(e) {
          this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach((e) => e.play());
        }
        pause() {
          this.players.forEach((e) => e.pause());
        }
        restart() {
          this.players.forEach((e) => e.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach((e) => e.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach((e) => e.destroy()),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach((e) => e.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(e) {
          const n = e * this.totalTime;
          this.players.forEach((r) => {
            const i = r.totalTime ? Math.min(1, n / r.totalTime) : 1;
            r.setPosition(i);
          });
        }
        getPosition() {
          const e = this.players.reduce(
            (n, r) => (null === n || r.totalTime > n.totalTime ? r : n),
            null
          );
          return null != e ? e.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach((e) => {
            e.beforeDestroy && e.beforeDestroy();
          });
        }
        triggerCallback(e) {
          const n = "start" == e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      const Pf = "!";
      function ib(t) {
        return new _(3e3, !1);
      }
      function Tr(t) {
        switch (t.length) {
          case 0:
            return new ds();
          case 1:
            return t[0];
          default:
            return new rb(t);
        }
      }
      function ob(t, e, n = new Map(), r = new Map()) {
        const i = [],
          o = [];
        let s = -1,
          a = null;
        if (
          (e.forEach((l) => {
            const u = l.get("offset"),
              c = u == s,
              d = (c && a) || new Map();
            l.forEach((f, h) => {
              let p = h,
                m = f;
              if ("offset" !== h)
                switch (((p = t.normalizePropertyName(p, i)), m)) {
                  case Pf:
                    m = n.get(h);
                    break;
                  case lr:
                    m = r.get(h);
                    break;
                  default:
                    m = t.normalizeStyleValue(h, p, m, i);
                }
              d.set(p, m);
            }),
              c || o.push(d),
              (a = d),
              (s = u);
          }),
          i.length)
        )
          throw (function Kk(t) {
            return new _(3502, !1);
          })();
        return o;
      }
      function kf(t, e, n, r) {
        switch (e) {
          case "start":
            t.onStart(() => r(n && Lf(n, "start", t)));
            break;
          case "done":
            t.onDone(() => r(n && Lf(n, "done", t)));
            break;
          case "destroy":
            t.onDestroy(() => r(n && Lf(n, "destroy", t)));
        }
      }
      function Lf(t, e, n) {
        const o = Vf(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            n.totalTime ?? t.totalTime,
            !!n.disabled
          ),
          s = t._data;
        return null != s && (o._data = s), o;
      }
      function Vf(t, e, n, r, i = "", o = 0, s) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: r,
          phaseName: i,
          totalTime: o,
          disabled: !!s,
        };
      }
      function Xt(t, e, n) {
        let r = t.get(e);
        return r || t.set(e, (r = n)), r;
      }
      function sb(t) {
        const e = t.indexOf(":");
        return [t.substring(1, e), t.slice(e + 1)];
      }
      const a1 = (() =>
        typeof document > "u" ? null : document.documentElement)();
      function Bf(t) {
        const e = t.parentNode || t.host || null;
        return e === a1 ? null : e;
      }
      let Jr = null,
        ab = !1;
      function lb(t, e) {
        for (; e; ) {
          if (e === t) return !0;
          e = Bf(e);
        }
        return !1;
      }
      function ub(t, e, n) {
        if (n) return Array.from(t.querySelectorAll(e));
        const r = t.querySelector(e);
        return r ? [r] : [];
      }
      let cb = (() => {
          class t {
            validateStyleProperty(n) {
              return (function u1(t) {
                Jr ||
                  ((Jr =
                    (function c1() {
                      return typeof document < "u" ? document.body : null;
                    })() || {}),
                  (ab = !!Jr.style && "WebkitAppearance" in Jr.style));
                let e = !0;
                return (
                  Jr.style &&
                    !(function l1(t) {
                      return "ebkit" == t.substring(1, 6);
                    })(t) &&
                    ((e = t in Jr.style),
                    !e &&
                      ab &&
                      (e =
                        "Webkit" + t.charAt(0).toUpperCase() + t.slice(1) in
                        Jr.style)),
                  e
                );
              })(n);
            }
            matchesElement(n, r) {
              return !1;
            }
            containsElement(n, r) {
              return lb(n, r);
            }
            getParentElement(n) {
              return Bf(n);
            }
            query(n, r, i) {
              return ub(n, r, i);
            }
            computeStyle(n, r, i) {
              return i || "";
            }
            animate(n, r, i, o, s, a = [], l) {
              return new ds(i, o);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Hf = (() => {
          class t {}
          return (t.NOOP = new cb()), t;
        })();
      const d1 = 1e3,
        jf = "ng-enter",
        wl = "ng-leave",
        Cl = "ng-trigger",
        Ml = ".ng-trigger",
        fb = "ng-animating",
        Uf = ".ng-animating";
      function ur(t) {
        if ("number" == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : $f(parseFloat(e[1]), e[2]);
      }
      function $f(t, e) {
        return "s" === e ? t * d1 : t;
      }
      function Sl(t, e, n) {
        return t.hasOwnProperty("duration")
          ? t
          : (function h1(t, e, n) {
              let i,
                o = 0,
                s = "";
              if ("string" == typeof t) {
                const a = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === a)
                  return e.push(ib()), { duration: 0, delay: 0, easing: "" };
                i = $f(parseFloat(a[1]), a[2]);
                const l = a[3];
                null != l && (o = $f(parseFloat(l), a[4]));
                const u = a[5];
                u && (s = u);
              } else i = t;
              if (!n) {
                let a = !1,
                  l = e.length;
                i < 0 &&
                  (e.push(
                    (function Sk() {
                      return new _(3100, !1);
                    })()
                  ),
                  (a = !0)),
                  o < 0 &&
                    (e.push(
                      (function Ik() {
                        return new _(3101, !1);
                      })()
                    ),
                    (a = !0)),
                  a && e.splice(l, 0, ib());
              }
              return { duration: i, delay: o, easing: s };
            })(t, e, n);
      }
      function fs(t, e = {}) {
        return (
          Object.keys(t).forEach((n) => {
            e[n] = t[n];
          }),
          e
        );
      }
      function hb(t) {
        const e = new Map();
        return (
          Object.keys(t).forEach((n) => {
            e.set(n, t[n]);
          }),
          e
        );
      }
      function Ar(t, e = new Map(), n) {
        if (n) for (let [r, i] of n) e.set(r, i);
        for (let [r, i] of t) e.set(r, i);
        return e;
      }
      function Gn(t, e, n) {
        e.forEach((r, i) => {
          const o = Gf(i);
          n && !n.has(i) && n.set(i, t.style[o]), (t.style[o] = r);
        });
      }
      function ei(t, e) {
        e.forEach((n, r) => {
          const i = Gf(r);
          t.style[i] = "";
        });
      }
      function hs(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : eb(t)) : t;
      }
      const zf = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function mb(t) {
        let e = [];
        if ("string" == typeof t) {
          let n;
          for (; (n = zf.exec(t)); ) e.push(n[1]);
          zf.lastIndex = 0;
        }
        return e;
      }
      function ps(t, e, n) {
        const r = t.toString(),
          i = r.replace(zf, (o, s) => {
            let a = e[s];
            return (
              null == a &&
                (n.push(
                  (function Ak(t) {
                    return new _(3003, !1);
                  })()
                ),
                (a = "")),
              a.toString()
            );
          });
        return i == r ? t : i;
      }
      function Il(t) {
        const e = [];
        let n = t.next();
        for (; !n.done; ) e.push(n.value), (n = t.next());
        return e;
      }
      const g1 = /-+([a-z0-9])/g;
      function Gf(t) {
        return t.replace(g1, (...e) => e[1].toUpperCase());
      }
      function Jt(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw (function Nk(t) {
              return new _(3004, !1);
            })();
        }
      }
      function gb(t, e) {
        return window.getComputedStyle(t)[e];
      }
      const Tl = "*";
      function v1(t, e) {
        const n = [];
        return (
          "string" == typeof t
            ? t.split(/\s*,\s*/).forEach((r) =>
                (function D1(t, e, n) {
                  if (":" == t[0]) {
                    const l = (function E1(t, e) {
                      switch (t) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (n, r) => parseFloat(r) > parseFloat(n);
                        case ":decrement":
                          return (n, r) => parseFloat(r) < parseFloat(n);
                        default:
                          return (
                            e.push(
                              (function zk(t) {
                                return new _(3016, !1);
                              })()
                            ),
                            "* => *"
                          );
                      }
                    })(t, n);
                    if ("function" == typeof l) return void e.push(l);
                    t = l;
                  }
                  const r = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == r || r.length < 4)
                    return (
                      n.push(
                        (function $k(t) {
                          return new _(3015, !1);
                        })()
                      ),
                      e
                    );
                  const i = r[1],
                    o = r[2],
                    s = r[3];
                  e.push(yb(i, s));
                  "<" == o[0] && !(i == Tl && s == Tl) && e.push(yb(s, i));
                })(r, n, e)
              )
            : n.push(t),
          n
        );
      }
      const Al = new Set(["true", "1"]),
        Nl = new Set(["false", "0"]);
      function yb(t, e) {
        const n = Al.has(t) || Nl.has(t),
          r = Al.has(e) || Nl.has(e);
        return (i, o) => {
          let s = t == Tl || t == i,
            a = e == Tl || e == o;
          return (
            !s && n && "boolean" == typeof i && (s = i ? Al.has(t) : Nl.has(t)),
            !a && r && "boolean" == typeof o && (a = o ? Al.has(e) : Nl.has(e)),
            s && a
          );
        };
      }
      const b1 = new RegExp("s*:selfs*,?", "g");
      function qf(t, e, n, r) {
        return new w1(t).build(e, n, r);
      }
      class w1 {
        constructor(e) {
          this._driver = e;
        }
        build(e, n, r) {
          const i = new S1(n);
          return this._resetContextStyleTimingState(i), Jt(this, hs(e), i);
        }
        _resetContextStyleTimingState(e) {
          (e.currentQuerySelector = ""),
            (e.collectedStyles = new Map()),
            e.collectedStyles.set("", new Map()),
            (e.currentTime = 0);
        }
        visitTrigger(e, n) {
          let r = (n.queryCount = 0),
            i = (n.depCount = 0);
          const o = [],
            s = [];
          return (
            "@" == e.name.charAt(0) &&
              n.errors.push(
                (function Ok() {
                  return new _(3006, !1);
                })()
              ),
            e.definitions.forEach((a) => {
              if ((this._resetContextStyleTimingState(n), 0 == a.type)) {
                const l = a,
                  u = l.name;
                u
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach((c) => {
                    (l.name = c), o.push(this.visitState(l, n));
                  }),
                  (l.name = u);
              } else if (1 == a.type) {
                const l = this.visitTransition(a, n);
                (r += l.queryCount), (i += l.depCount), s.push(l);
              } else
                n.errors.push(
                  (function xk() {
                    return new _(3007, !1);
                  })()
                );
            }),
            {
              type: 7,
              name: e.name,
              states: o,
              transitions: s,
              queryCount: r,
              depCount: i,
              options: null,
            }
          );
        }
        visitState(e, n) {
          const r = this.visitStyle(e.styles, n),
            i = (e.options && e.options.params) || null;
          if (r.containsDynamicStyles) {
            const o = new Set(),
              s = i || {};
            r.styles.forEach((a) => {
              a instanceof Map &&
                a.forEach((l) => {
                  mb(l).forEach((u) => {
                    s.hasOwnProperty(u) || o.add(u);
                  });
                });
            }),
              o.size &&
                (Il(o.values()),
                n.errors.push(
                  (function Rk(t, e) {
                    return new _(3008, !1);
                  })()
                ));
          }
          return {
            type: 0,
            name: e.name,
            style: r,
            options: i ? { params: i } : null,
          };
        }
        visitTransition(e, n) {
          (n.queryCount = 0), (n.depCount = 0);
          const r = Jt(this, hs(e.animation), n);
          return {
            type: 1,
            matchers: v1(e.expr, n.errors),
            animation: r,
            queryCount: n.queryCount,
            depCount: n.depCount,
            options: ti(e.options),
          };
        }
        visitSequence(e, n) {
          return {
            type: 2,
            steps: e.steps.map((r) => Jt(this, r, n)),
            options: ti(e.options),
          };
        }
        visitGroup(e, n) {
          const r = n.currentTime;
          let i = 0;
          const o = e.steps.map((s) => {
            n.currentTime = r;
            const a = Jt(this, s, n);
            return (i = Math.max(i, n.currentTime)), a;
          });
          return (
            (n.currentTime = i), { type: 3, steps: o, options: ti(e.options) }
          );
        }
        visitAnimate(e, n) {
          const r = (function T1(t, e) {
            if (t.hasOwnProperty("duration")) return t;
            if ("number" == typeof t) return Wf(Sl(t, e).duration, 0, "");
            const n = t;
            if (
              n
                .split(/\s+/)
                .some((o) => "{" == o.charAt(0) && "{" == o.charAt(1))
            ) {
              const o = Wf(0, 0, "");
              return (o.dynamic = !0), (o.strValue = n), o;
            }
            const i = Sl(n, e);
            return Wf(i.duration, i.delay, i.easing);
          })(e.timings, n.errors);
          n.currentAnimateTimings = r;
          let i,
            o = e.styles ? e.styles : tb({});
          if (5 == o.type) i = this.visitKeyframes(o, n);
          else {
            let s = e.styles,
              a = !1;
            if (!s) {
              a = !0;
              const u = {};
              r.easing && (u.easing = r.easing), (s = tb(u));
            }
            n.currentTime += r.duration + r.delay;
            const l = this.visitStyle(s, n);
            (l.isEmptyStep = a), (i = l);
          }
          return (
            (n.currentAnimateTimings = null),
            { type: 4, timings: r, style: i, options: null }
          );
        }
        visitStyle(e, n) {
          const r = this._makeStyleAst(e, n);
          return this._validateStyleAst(r, n), r;
        }
        _makeStyleAst(e, n) {
          const r = [],
            i = Array.isArray(e.styles) ? e.styles : [e.styles];
          for (let a of i)
            "string" == typeof a
              ? a === lr
                ? r.push(a)
                : n.errors.push(new _(3002, !1))
              : r.push(hb(a));
          let o = !1,
            s = null;
          return (
            r.forEach((a) => {
              if (
                a instanceof Map &&
                (a.has("easing") && ((s = a.get("easing")), a.delete("easing")),
                !o)
              )
                for (let l of a.values())
                  if (l.toString().indexOf("{{") >= 0) {
                    o = !0;
                    break;
                  }
            }),
            {
              type: 6,
              styles: r,
              easing: s,
              offset: e.offset,
              containsDynamicStyles: o,
              options: null,
            }
          );
        }
        _validateStyleAst(e, n) {
          const r = n.currentAnimateTimings;
          let i = n.currentTime,
            o = n.currentTime;
          r && o > 0 && (o -= r.duration + r.delay),
            e.styles.forEach((s) => {
              "string" != typeof s &&
                s.forEach((a, l) => {
                  const u = n.collectedStyles.get(n.currentQuerySelector),
                    c = u.get(l);
                  let d = !0;
                  c &&
                    (o != i &&
                      o >= c.startTime &&
                      i <= c.endTime &&
                      (n.errors.push(
                        (function kk(t, e, n, r, i) {
                          return new _(3010, !1);
                        })()
                      ),
                      (d = !1)),
                    (o = c.startTime)),
                    d && u.set(l, { startTime: o, endTime: i }),
                    n.options &&
                      (function m1(t, e, n) {
                        const r = e.params || {},
                          i = mb(t);
                        i.length &&
                          i.forEach((o) => {
                            r.hasOwnProperty(o) ||
                              n.push(
                                (function Tk(t) {
                                  return new _(3001, !1);
                                })()
                              );
                          });
                      })(a, n.options, n.errors);
                });
            });
        }
        visitKeyframes(e, n) {
          const r = { type: 5, styles: [], options: null };
          if (!n.currentAnimateTimings)
            return (
              n.errors.push(
                (function Lk() {
                  return new _(3011, !1);
                })()
              ),
              r
            );
          let o = 0;
          const s = [];
          let a = !1,
            l = !1,
            u = 0;
          const c = e.steps.map((v) => {
            const g = this._makeStyleAst(v, n);
            let b =
                null != g.offset
                  ? g.offset
                  : (function I1(t) {
                      if ("string" == typeof t) return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach((n) => {
                          if (n instanceof Map && n.has("offset")) {
                            const r = n;
                            (e = parseFloat(r.get("offset"))),
                              r.delete("offset");
                          }
                        });
                      else if (t instanceof Map && t.has("offset")) {
                        const n = t;
                        (e = parseFloat(n.get("offset"))), n.delete("offset");
                      }
                      return e;
                    })(g.styles),
              T = 0;
            return (
              null != b && (o++, (T = g.offset = b)),
              (l = l || T < 0 || T > 1),
              (a = a || T < u),
              (u = T),
              s.push(T),
              g
            );
          });
          l &&
            n.errors.push(
              (function Vk() {
                return new _(3012, !1);
              })()
            ),
            a &&
              n.errors.push(
                (function Bk() {
                  return new _(3200, !1);
                })()
              );
          const d = e.steps.length;
          let f = 0;
          o > 0 && o < d
            ? n.errors.push(
                (function Hk() {
                  return new _(3202, !1);
                })()
              )
            : 0 == o && (f = 1 / (d - 1));
          const h = d - 1,
            p = n.currentTime,
            m = n.currentAnimateTimings,
            y = m.duration;
          return (
            c.forEach((v, g) => {
              const b = f > 0 ? (g == h ? 1 : f * g) : s[g],
                T = b * y;
              (n.currentTime = p + m.delay + T),
                (m.duration = T),
                this._validateStyleAst(v, n),
                (v.offset = b),
                r.styles.push(v);
            }),
            r
          );
        }
        visitReference(e, n) {
          return {
            type: 8,
            animation: Jt(this, hs(e.animation), n),
            options: ti(e.options),
          };
        }
        visitAnimateChild(e, n) {
          return n.depCount++, { type: 9, options: ti(e.options) };
        }
        visitAnimateRef(e, n) {
          return {
            type: 10,
            animation: this.visitReference(e.animation, n),
            options: ti(e.options),
          };
        }
        visitQuery(e, n) {
          const r = n.currentQuerySelector,
            i = e.options || {};
          n.queryCount++, (n.currentQuery = e);
          const [o, s] = (function C1(t) {
            const e = !!t.split(/\s*,\s*/).find((n) => ":self" == n);
            return (
              e && (t = t.replace(b1, "")),
              (t = t
                .replace(/@\*/g, Ml)
                .replace(/@\w+/g, (n) => Ml + "-" + n.slice(1))
                .replace(/:animating/g, Uf)),
              [t, e]
            );
          })(e.selector);
          (n.currentQuerySelector = r.length ? r + " " + o : o),
            Xt(n.collectedStyles, n.currentQuerySelector, new Map());
          const a = Jt(this, hs(e.animation), n);
          return (
            (n.currentQuery = null),
            (n.currentQuerySelector = r),
            {
              type: 11,
              selector: o,
              limit: i.limit || 0,
              optional: !!i.optional,
              includeSelf: s,
              animation: a,
              originalSelector: e.selector,
              options: ti(e.options),
            }
          );
        }
        visitStagger(e, n) {
          n.currentQuery ||
            n.errors.push(
              (function jk() {
                return new _(3013, !1);
              })()
            );
          const r =
            "full" === e.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Sl(e.timings, n.errors, !0);
          return {
            type: 12,
            animation: Jt(this, hs(e.animation), n),
            timings: r,
            options: null,
          };
        }
      }
      class S1 {
        constructor(e) {
          (this.errors = e),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = new Map()),
            (this.options = null),
            (this.unsupportedCSSPropertiesFound = new Set());
        }
      }
      function ti(t) {
        return (
          t
            ? (t = fs(t)).params &&
              (t.params = (function M1(t) {
                return t ? fs(t) : null;
              })(t.params))
            : (t = {}),
          t
        );
      }
      function Wf(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function Kf(t, e, n, r, i, o, s = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: r,
          duration: i,
          delay: o,
          totalTime: i + o,
          easing: s,
          subTimeline: a,
        };
      }
      class Fl {
        constructor() {
          this._map = new Map();
        }
        get(e) {
          return this._map.get(e) || [];
        }
        append(e, n) {
          let r = this._map.get(e);
          r || this._map.set(e, (r = [])), r.push(...n);
        }
        has(e) {
          return this._map.has(e);
        }
        clear() {
          this._map.clear();
        }
      }
      const F1 = new RegExp(":enter", "g"),
        x1 = new RegExp(":leave", "g");
      function Zf(t, e, n, r, i, o = new Map(), s = new Map(), a, l, u = []) {
        return new R1().buildKeyframes(t, e, n, r, i, o, s, a, l, u);
      }
      class R1 {
        buildKeyframes(e, n, r, i, o, s, a, l, u, c = []) {
          u = u || new Fl();
          const d = new Qf(e, n, u, i, o, c, []);
          d.options = l;
          const f = l.delay ? ur(l.delay) : 0;
          d.currentTimeline.delayNextStep(f),
            d.currentTimeline.setStyles([s], null, d.errors, l),
            Jt(this, r, d);
          const h = d.timelines.filter((p) => p.containsAnimation());
          if (h.length && a.size) {
            let p;
            for (let m = h.length - 1; m >= 0; m--) {
              const y = h[m];
              if (y.element === n) {
                p = y;
                break;
              }
            }
            p &&
              !p.allowOnlyTimelineStyles() &&
              p.setStyles([a], null, d.errors, l);
          }
          return h.length
            ? h.map((p) => p.buildKeyframes())
            : [Kf(n, [], [], [], 0, f, "", !1)];
        }
        visitTrigger(e, n) {}
        visitState(e, n) {}
        visitTransition(e, n) {}
        visitAnimateChild(e, n) {
          const r = n.subInstructions.get(n.element);
          if (r) {
            const i = n.createSubContext(e.options),
              o = n.currentTimeline.currentTime,
              s = this._visitSubInstructions(r, i, i.options);
            o != s && n.transformIntoNewTimeline(s);
          }
          n.previousNode = e;
        }
        visitAnimateRef(e, n) {
          const r = n.createSubContext(e.options);
          r.transformIntoNewTimeline(),
            this._applyAnimationRefDelays(
              [e.options, e.animation.options],
              n,
              r
            ),
            this.visitReference(e.animation, r),
            n.transformIntoNewTimeline(r.currentTimeline.currentTime),
            (n.previousNode = e);
        }
        _applyAnimationRefDelays(e, n, r) {
          for (const i of e) {
            const o = i?.delay;
            if (o) {
              const s =
                "number" == typeof o ? o : ur(ps(o, i?.params ?? {}, n.errors));
              r.delayNextStep(s);
            }
          }
        }
        _visitSubInstructions(e, n, r) {
          let o = n.currentTimeline.currentTime;
          const s = null != r.duration ? ur(r.duration) : null,
            a = null != r.delay ? ur(r.delay) : null;
          return (
            0 !== s &&
              e.forEach((l) => {
                const u = n.appendInstructionToTimeline(l, s, a);
                o = Math.max(o, u.duration + u.delay);
              }),
            o
          );
        }
        visitReference(e, n) {
          n.updateOptions(e.options, !0),
            Jt(this, e.animation, n),
            (n.previousNode = e);
        }
        visitSequence(e, n) {
          const r = n.subContextCount;
          let i = n;
          const o = e.options;
          if (
            o &&
            (o.params || o.delay) &&
            ((i = n.createSubContext(o)),
            i.transformIntoNewTimeline(),
            null != o.delay)
          ) {
            6 == i.previousNode.type &&
              (i.currentTimeline.snapshotCurrentStyles(),
              (i.previousNode = Ol));
            const s = ur(o.delay);
            i.delayNextStep(s);
          }
          e.steps.length &&
            (e.steps.forEach((s) => Jt(this, s, i)),
            i.currentTimeline.applyStylesToKeyframe(),
            i.subContextCount > r && i.transformIntoNewTimeline()),
            (n.previousNode = e);
        }
        visitGroup(e, n) {
          const r = [];
          let i = n.currentTimeline.currentTime;
          const o = e.options && e.options.delay ? ur(e.options.delay) : 0;
          e.steps.forEach((s) => {
            const a = n.createSubContext(e.options);
            o && a.delayNextStep(o),
              Jt(this, s, a),
              (i = Math.max(i, a.currentTimeline.currentTime)),
              r.push(a.currentTimeline);
          }),
            r.forEach((s) => n.currentTimeline.mergeTimelineCollectedStyles(s)),
            n.transformIntoNewTimeline(i),
            (n.previousNode = e);
        }
        _visitTiming(e, n) {
          if (e.dynamic) {
            const r = e.strValue;
            return Sl(n.params ? ps(r, n.params, n.errors) : r, n.errors);
          }
          return { duration: e.duration, delay: e.delay, easing: e.easing };
        }
        visitAnimate(e, n) {
          const r = (n.currentAnimateTimings = this._visitTiming(e.timings, n)),
            i = n.currentTimeline;
          r.delay && (n.incrementTime(r.delay), i.snapshotCurrentStyles());
          const o = e.style;
          5 == o.type
            ? this.visitKeyframes(o, n)
            : (n.incrementTime(r.duration),
              this.visitStyle(o, n),
              i.applyStylesToKeyframe()),
            (n.currentAnimateTimings = null),
            (n.previousNode = e);
        }
        visitStyle(e, n) {
          const r = n.currentTimeline,
            i = n.currentAnimateTimings;
          !i && r.hasCurrentStyleProperties() && r.forwardFrame();
          const o = (i && i.easing) || e.easing;
          e.isEmptyStep
            ? r.applyEmptyStep(o)
            : r.setStyles(e.styles, o, n.errors, n.options),
            (n.previousNode = e);
        }
        visitKeyframes(e, n) {
          const r = n.currentAnimateTimings,
            i = n.currentTimeline.duration,
            o = r.duration,
            a = n.createSubContext().currentTimeline;
          (a.easing = r.easing),
            e.styles.forEach((l) => {
              a.forwardTime((l.offset || 0) * o),
                a.setStyles(l.styles, l.easing, n.errors, n.options),
                a.applyStylesToKeyframe();
            }),
            n.currentTimeline.mergeTimelineCollectedStyles(a),
            n.transformIntoNewTimeline(i + o),
            (n.previousNode = e);
        }
        visitQuery(e, n) {
          const r = n.currentTimeline.currentTime,
            i = e.options || {},
            o = i.delay ? ur(i.delay) : 0;
          o &&
            (6 === n.previousNode.type ||
              (0 == r && n.currentTimeline.hasCurrentStyleProperties())) &&
            (n.currentTimeline.snapshotCurrentStyles(), (n.previousNode = Ol));
          let s = r;
          const a = n.invokeQuery(
            e.selector,
            e.originalSelector,
            e.limit,
            e.includeSelf,
            !!i.optional,
            n.errors
          );
          n.currentQueryTotal = a.length;
          let l = null;
          a.forEach((u, c) => {
            n.currentQueryIndex = c;
            const d = n.createSubContext(e.options, u);
            o && d.delayNextStep(o),
              u === n.element && (l = d.currentTimeline),
              Jt(this, e.animation, d),
              d.currentTimeline.applyStylesToKeyframe(),
              (s = Math.max(s, d.currentTimeline.currentTime));
          }),
            (n.currentQueryIndex = 0),
            (n.currentQueryTotal = 0),
            n.transformIntoNewTimeline(s),
            l &&
              (n.currentTimeline.mergeTimelineCollectedStyles(l),
              n.currentTimeline.snapshotCurrentStyles()),
            (n.previousNode = e);
        }
        visitStagger(e, n) {
          const r = n.parentContext,
            i = n.currentTimeline,
            o = e.timings,
            s = Math.abs(o.duration),
            a = s * (n.currentQueryTotal - 1);
          let l = s * n.currentQueryIndex;
          switch (o.duration < 0 ? "reverse" : o.easing) {
            case "reverse":
              l = a - l;
              break;
            case "full":
              l = r.currentStaggerTime;
          }
          const c = n.currentTimeline;
          l && c.delayNextStep(l);
          const d = c.currentTime;
          Jt(this, e.animation, n),
            (n.previousNode = e),
            (r.currentStaggerTime =
              i.currentTime - d + (i.startTime - r.currentTimeline.startTime));
        }
      }
      const Ol = {};
      class Qf {
        constructor(e, n, r, i, o, s, a, l) {
          (this._driver = e),
            (this.element = n),
            (this.subInstructions = r),
            (this._enterClassName = i),
            (this._leaveClassName = o),
            (this.errors = s),
            (this.timelines = a),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = Ol),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = l || new xl(this._driver, n, 0)),
            a.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(e, n) {
          if (!e) return;
          const r = e;
          let i = this.options;
          null != r.duration && (i.duration = ur(r.duration)),
            null != r.delay && (i.delay = ur(r.delay));
          const o = r.params;
          if (o) {
            let s = i.params;
            s || (s = this.options.params = {}),
              Object.keys(o).forEach((a) => {
                (!n || !s.hasOwnProperty(a)) &&
                  (s[a] = ps(o[a], s, this.errors));
              });
          }
        }
        _copyOptions() {
          const e = {};
          if (this.options) {
            const n = this.options.params;
            if (n) {
              const r = (e.params = {});
              Object.keys(n).forEach((i) => {
                r[i] = n[i];
              });
            }
          }
          return e;
        }
        createSubContext(e = null, n, r) {
          const i = n || this.element,
            o = new Qf(
              this._driver,
              i,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(i, r || 0)
            );
          return (
            (o.previousNode = this.previousNode),
            (o.currentAnimateTimings = this.currentAnimateTimings),
            (o.options = this._copyOptions()),
            o.updateOptions(e),
            (o.currentQueryIndex = this.currentQueryIndex),
            (o.currentQueryTotal = this.currentQueryTotal),
            (o.parentContext = this),
            this.subContextCount++,
            o
          );
        }
        transformIntoNewTimeline(e) {
          return (
            (this.previousNode = Ol),
            (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(e, n, r) {
          const i = {
              duration: n ?? e.duration,
              delay: this.currentTimeline.currentTime + (r ?? 0) + e.delay,
              easing: "",
            },
            o = new P1(
              this._driver,
              e.element,
              e.keyframes,
              e.preStyleProps,
              e.postStyleProps,
              i,
              e.stretchStartingKeyframe
            );
          return this.timelines.push(o), i;
        }
        incrementTime(e) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
        }
        delayNextStep(e) {
          e > 0 && this.currentTimeline.delayNextStep(e);
        }
        invokeQuery(e, n, r, i, o, s) {
          let a = [];
          if ((i && a.push(this.element), e.length > 0)) {
            e = (e = e.replace(F1, "." + this._enterClassName)).replace(
              x1,
              "." + this._leaveClassName
            );
            let u = this._driver.query(this.element, e, 1 != r);
            0 !== r &&
              (u = r < 0 ? u.slice(u.length + r, u.length) : u.slice(0, r)),
              a.push(...u);
          }
          return (
            !o &&
              0 == a.length &&
              s.push(
                (function Uk(t) {
                  return new _(3014, !1);
                })()
              ),
            a
          );
        }
      }
      class xl {
        constructor(e, n, r, i) {
          (this._driver = e),
            (this.element = n),
            (this.startTime = r),
            (this._elementTimelineStylesLookup = i),
            (this.duration = 0),
            (this.easing = null),
            (this._previousKeyframe = new Map()),
            (this._currentKeyframe = new Map()),
            (this._keyframes = new Map()),
            (this._styleSummary = new Map()),
            (this._localTimelineStyles = new Map()),
            (this._pendingStyles = new Map()),
            (this._backFill = new Map()),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._globalTimelineStyles =
              this._elementTimelineStylesLookup.get(n)),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                n,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.hasCurrentStyleProperties();
            default:
              return !0;
          }
        }
        hasCurrentStyleProperties() {
          return this._currentKeyframe.size > 0;
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(e) {
          const n = 1 === this._keyframes.size && this._pendingStyles.size;
          this.duration || n
            ? (this.forwardTime(this.currentTime + e),
              n && this.snapshotCurrentStyles())
            : (this.startTime += e);
        }
        fork(e, n) {
          return (
            this.applyStylesToKeyframe(),
            new xl(
              this._driver,
              e,
              n || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = new Map()),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(e) {
          this.applyStylesToKeyframe(),
            (this.duration = e),
            this._loadKeyframe();
        }
        _updateStyle(e, n) {
          this._localTimelineStyles.set(e, n),
            this._globalTimelineStyles.set(e, n),
            this._styleSummary.set(e, { time: this.currentTime, value: n });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(e) {
          e && this._previousKeyframe.set("easing", e);
          for (let [n, r] of this._globalTimelineStyles)
            this._backFill.set(n, r || lr), this._currentKeyframe.set(n, lr);
          this._currentEmptyStepKeyframe = this._currentKeyframe;
        }
        setStyles(e, n, r, i) {
          n && this._previousKeyframe.set("easing", n);
          const o = (i && i.params) || {},
            s = (function k1(t, e) {
              const n = new Map();
              let r;
              return (
                t.forEach((i) => {
                  if ("*" === i) {
                    r = r || e.keys();
                    for (let o of r) n.set(o, lr);
                  } else Ar(i, n);
                }),
                n
              );
            })(e, this._globalTimelineStyles);
          for (let [a, l] of s) {
            const u = ps(l, o, r);
            this._pendingStyles.set(a, u),
              this._localTimelineStyles.has(a) ||
                this._backFill.set(a, this._globalTimelineStyles.get(a) ?? lr),
              this._updateStyle(a, u);
          }
        }
        applyStylesToKeyframe() {
          0 != this._pendingStyles.size &&
            (this._pendingStyles.forEach((e, n) => {
              this._currentKeyframe.set(n, e);
            }),
            this._pendingStyles.clear(),
            this._localTimelineStyles.forEach((e, n) => {
              this._currentKeyframe.has(n) || this._currentKeyframe.set(n, e);
            }));
        }
        snapshotCurrentStyles() {
          for (let [e, n] of this._localTimelineStyles)
            this._pendingStyles.set(e, n), this._updateStyle(e, n);
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const e = [];
          for (let n in this._currentKeyframe) e.push(n);
          return e;
        }
        mergeTimelineCollectedStyles(e) {
          e._styleSummary.forEach((n, r) => {
            const i = this._styleSummary.get(r);
            (!i || n.time > i.time) && this._updateStyle(r, n.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const e = new Set(),
            n = new Set(),
            r = 1 === this._keyframes.size && 0 === this.duration;
          let i = [];
          this._keyframes.forEach((a, l) => {
            const u = Ar(a, new Map(), this._backFill);
            u.forEach((c, d) => {
              c === Pf ? e.add(d) : c === lr && n.add(d);
            }),
              r || u.set("offset", l / this.duration),
              i.push(u);
          });
          const o = e.size ? Il(e.values()) : [],
            s = n.size ? Il(n.values()) : [];
          if (r) {
            const a = i[0],
              l = new Map(a);
            a.set("offset", 0), l.set("offset", 1), (i = [a, l]);
          }
          return Kf(
            this.element,
            i,
            o,
            s,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class P1 extends xl {
        constructor(e, n, r, i, o, s, a = !1) {
          super(e, n, s.delay),
            (this.keyframes = r),
            (this.preStyleProps = i),
            (this.postStyleProps = o),
            (this._stretchStartingKeyframe = a),
            (this.timings = {
              duration: s.duration,
              delay: s.delay,
              easing: s.easing,
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let e = this.keyframes,
            { delay: n, duration: r, easing: i } = this.timings;
          if (this._stretchStartingKeyframe && n) {
            const o = [],
              s = r + n,
              a = n / s,
              l = Ar(e[0]);
            l.set("offset", 0), o.push(l);
            const u = Ar(e[0]);
            u.set("offset", Db(a)), o.push(u);
            const c = e.length - 1;
            for (let d = 1; d <= c; d++) {
              let f = Ar(e[d]);
              const h = f.get("offset");
              f.set("offset", Db((n + h * r) / s)), o.push(f);
            }
            (r = s), (n = 0), (i = ""), (e = o);
          }
          return Kf(
            this.element,
            e,
            this.preStyleProps,
            this.postStyleProps,
            r,
            n,
            i,
            !0
          );
        }
      }
      function Db(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      class Yf {}
      const L1 = new Set([
        "width",
        "height",
        "minWidth",
        "minHeight",
        "maxWidth",
        "maxHeight",
        "left",
        "top",
        "bottom",
        "right",
        "fontSize",
        "outlineWidth",
        "outlineOffset",
        "paddingTop",
        "paddingLeft",
        "paddingBottom",
        "paddingRight",
        "marginTop",
        "marginLeft",
        "marginBottom",
        "marginRight",
        "borderRadius",
        "borderWidth",
        "borderTopWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderBottomWidth",
        "textIndent",
        "perspective",
      ]);
      class V1 extends Yf {
        normalizePropertyName(e, n) {
          return Gf(e);
        }
        normalizeStyleValue(e, n, r, i) {
          let o = "";
          const s = r.toString().trim();
          if (L1.has(n) && 0 !== r && "0" !== r)
            if ("number" == typeof r) o = "px";
            else {
              const a = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
              a &&
                0 == a[1].length &&
                i.push(
                  (function Fk(t, e) {
                    return new _(3005, !1);
                  })()
                );
            }
          return s + o;
        }
      }
      function Eb(t, e, n, r, i, o, s, a, l, u, c, d, f) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: i,
          fromState: n,
          fromStyles: o,
          toState: r,
          toStyles: s,
          timelines: a,
          queriedElements: l,
          preStyleProps: u,
          postStyleProps: c,
          totalTime: d,
          errors: f,
        };
      }
      const Xf = {};
      class bb {
        constructor(e, n, r) {
          (this._triggerName = e), (this.ast = n), (this._stateStyles = r);
        }
        match(e, n, r, i) {
          return (function B1(t, e, n, r, i) {
            return t.some((o) => o(e, n, r, i));
          })(this.ast.matchers, e, n, r, i);
        }
        buildStyles(e, n, r) {
          let i = this._stateStyles.get("*");
          return (
            void 0 !== e && (i = this._stateStyles.get(e?.toString()) || i),
            i ? i.buildStyles(n, r) : new Map()
          );
        }
        build(e, n, r, i, o, s, a, l, u, c) {
          const d = [],
            f = (this.ast.options && this.ast.options.params) || Xf,
            p = this.buildStyles(r, (a && a.params) || Xf, d),
            m = (l && l.params) || Xf,
            y = this.buildStyles(i, m, d),
            v = new Set(),
            g = new Map(),
            b = new Map(),
            T = "void" === i,
            z = { params: H1(m, f), delay: this.ast.options?.delay },
            Pe = c ? [] : Zf(e, n, this.ast.animation, o, s, p, y, z, u, d);
          let rt = 0;
          if (
            (Pe.forEach((fr) => {
              rt = Math.max(fr.duration + fr.delay, rt);
            }),
            d.length)
          )
            return Eb(n, this._triggerName, r, i, T, p, y, [], [], g, b, rt, d);
          Pe.forEach((fr) => {
            const hr = fr.element,
              Mw = Xt(g, hr, new Set());
            fr.preStyleProps.forEach((oi) => Mw.add(oi));
            const bs = Xt(b, hr, new Set());
            fr.postStyleProps.forEach((oi) => bs.add(oi)),
              hr !== n && v.add(hr);
          });
          const dr = Il(v.values());
          return Eb(n, this._triggerName, r, i, T, p, y, Pe, dr, g, b, rt);
        }
      }
      function H1(t, e) {
        const n = fs(e);
        for (const r in t) t.hasOwnProperty(r) && null != t[r] && (n[r] = t[r]);
        return n;
      }
      class j1 {
        constructor(e, n, r) {
          (this.styles = e), (this.defaultParams = n), (this.normalizer = r);
        }
        buildStyles(e, n) {
          const r = new Map(),
            i = fs(this.defaultParams);
          return (
            Object.keys(e).forEach((o) => {
              const s = e[o];
              null !== s && (i[o] = s);
            }),
            this.styles.styles.forEach((o) => {
              "string" != typeof o &&
                o.forEach((s, a) => {
                  s && (s = ps(s, i, n));
                  const l = this.normalizer.normalizePropertyName(a, n);
                  (s = this.normalizer.normalizeStyleValue(a, l, s, n)),
                    r.set(a, s);
                });
            }),
            r
          );
        }
      }
      class $1 {
        constructor(e, n, r) {
          (this.name = e),
            (this.ast = n),
            (this._normalizer = r),
            (this.transitionFactories = []),
            (this.states = new Map()),
            n.states.forEach((i) => {
              this.states.set(
                i.name,
                new j1(i.style, (i.options && i.options.params) || {}, r)
              );
            }),
            wb(this.states, "true", "1"),
            wb(this.states, "false", "0"),
            n.transitions.forEach((i) => {
              this.transitionFactories.push(new bb(e, i, this.states));
            }),
            (this.fallbackTransition = (function z1(t, e, n) {
              return new bb(
                t,
                {
                  type: 1,
                  animation: { type: 2, steps: [], options: null },
                  matchers: [(s, a) => !0],
                  options: null,
                  queryCount: 0,
                  depCount: 0,
                },
                e
              );
            })(e, this.states));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(e, n, r, i) {
          return (
            this.transitionFactories.find((s) => s.match(e, n, r, i)) || null
          );
        }
        matchStyles(e, n, r) {
          return this.fallbackTransition.buildStyles(e, n, r);
        }
      }
      function wb(t, e, n) {
        t.has(e)
          ? t.has(n) || t.set(n, t.get(e))
          : t.has(n) && t.set(e, t.get(n));
      }
      const G1 = new Fl();
      class q1 {
        constructor(e, n, r) {
          (this.bodyNode = e),
            (this._driver = n),
            (this._normalizer = r),
            (this._animations = new Map()),
            (this._playersById = new Map()),
            (this.players = []);
        }
        register(e, n) {
          const r = [],
            o = qf(this._driver, n, r, []);
          if (r.length)
            throw (function Zk(t) {
              return new _(3503, !1);
            })();
          this._animations.set(e, o);
        }
        _buildPlayer(e, n, r) {
          const i = e.element,
            o = ob(this._normalizer, e.keyframes, n, r);
          return this._driver.animate(
            i,
            o,
            e.duration,
            e.delay,
            e.easing,
            [],
            !0
          );
        }
        create(e, n, r = {}) {
          const i = [],
            o = this._animations.get(e);
          let s;
          const a = new Map();
          if (
            (o
              ? ((s = Zf(
                  this._driver,
                  n,
                  o,
                  jf,
                  wl,
                  new Map(),
                  new Map(),
                  r,
                  G1,
                  i
                )),
                s.forEach((c) => {
                  const d = Xt(a, c.element, new Map());
                  c.postStyleProps.forEach((f) => d.set(f, null));
                }))
              : (i.push(
                  (function Qk() {
                    return new _(3300, !1);
                  })()
                ),
                (s = [])),
            i.length)
          )
            throw (function Yk(t) {
              return new _(3504, !1);
            })();
          a.forEach((c, d) => {
            c.forEach((f, h) => {
              c.set(h, this._driver.computeStyle(d, h, lr));
            });
          });
          const u = Tr(
            s.map((c) => {
              const d = a.get(c.element);
              return this._buildPlayer(c, new Map(), d);
            })
          );
          return (
            this._playersById.set(e, u),
            u.onDestroy(() => this.destroy(e)),
            this.players.push(u),
            u
          );
        }
        destroy(e) {
          const n = this._getPlayer(e);
          n.destroy(), this._playersById.delete(e);
          const r = this.players.indexOf(n);
          r >= 0 && this.players.splice(r, 1);
        }
        _getPlayer(e) {
          const n = this._playersById.get(e);
          if (!n)
            throw (function Xk(t) {
              return new _(3301, !1);
            })();
          return n;
        }
        listen(e, n, r, i) {
          const o = Vf(n, "", "", "");
          return kf(this._getPlayer(e), r, o, i), () => {};
        }
        command(e, n, r, i) {
          if ("register" == r) return void this.register(e, i[0]);
          if ("create" == r) return void this.create(e, n, i[0] || {});
          const o = this._getPlayer(e);
          switch (r) {
            case "play":
              o.play();
              break;
            case "pause":
              o.pause();
              break;
            case "reset":
              o.reset();
              break;
            case "restart":
              o.restart();
              break;
            case "finish":
              o.finish();
              break;
            case "init":
              o.init();
              break;
            case "setPosition":
              o.setPosition(parseFloat(i[0]));
              break;
            case "destroy":
              this.destroy(e);
          }
        }
      }
      const Cb = "ng-animate-queued",
        Jf = "ng-animate-disabled",
        Y1 = [],
        Mb = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1,
        },
        X1 = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0,
        },
        dn = "__ng_removed";
      class eh {
        get params() {
          return this.options.params;
        }
        constructor(e, n = "") {
          this.namespaceId = n;
          const r = e && e.hasOwnProperty("value");
          if (
            ((this.value = (function nL(t) {
              return t ?? null;
            })(r ? e.value : e)),
            r)
          ) {
            const o = fs(e);
            delete o.value, (this.options = o);
          } else this.options = {};
          this.options.params || (this.options.params = {});
        }
        absorbOptions(e) {
          const n = e.params;
          if (n) {
            const r = this.options.params;
            Object.keys(n).forEach((i) => {
              null == r[i] && (r[i] = n[i]);
            });
          }
        }
      }
      const ms = "void",
        th = new eh(ms);
      class J1 {
        constructor(e, n, r) {
          (this.id = e),
            (this.hostElement = n),
            (this._engine = r),
            (this.players = []),
            (this._triggers = new Map()),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + e),
            fn(n, this._hostClassName);
        }
        listen(e, n, r, i) {
          if (!this._triggers.has(n))
            throw (function Jk(t, e) {
              return new _(3302, !1);
            })();
          if (null == r || 0 == r.length)
            throw (function e1(t) {
              return new _(3303, !1);
            })();
          if (
            !(function rL(t) {
              return "start" == t || "done" == t;
            })(r)
          )
            throw (function t1(t, e) {
              return new _(3400, !1);
            })();
          const o = Xt(this._elementListeners, e, []),
            s = { name: n, phase: r, callback: i };
          o.push(s);
          const a = Xt(this._engine.statesByElement, e, new Map());
          return (
            a.has(n) || (fn(e, Cl), fn(e, Cl + "-" + n), a.set(n, th)),
            () => {
              this._engine.afterFlush(() => {
                const l = o.indexOf(s);
                l >= 0 && o.splice(l, 1), this._triggers.has(n) || a.delete(n);
              });
            }
          );
        }
        register(e, n) {
          return !this._triggers.has(e) && (this._triggers.set(e, n), !0);
        }
        _getTrigger(e) {
          const n = this._triggers.get(e);
          if (!n)
            throw (function n1(t) {
              return new _(3401, !1);
            })();
          return n;
        }
        trigger(e, n, r, i = !0) {
          const o = this._getTrigger(n),
            s = new nh(this.id, n, e);
          let a = this._engine.statesByElement.get(e);
          a ||
            (fn(e, Cl),
            fn(e, Cl + "-" + n),
            this._engine.statesByElement.set(e, (a = new Map())));
          let l = a.get(n);
          const u = new eh(r, this.id);
          if (
            (!(r && r.hasOwnProperty("value")) &&
              l &&
              u.absorbOptions(l.options),
            a.set(n, u),
            l || (l = th),
            u.value !== ms && l.value === u.value)
          ) {
            if (
              !(function sL(t, e) {
                const n = Object.keys(t),
                  r = Object.keys(e);
                if (n.length != r.length) return !1;
                for (let i = 0; i < n.length; i++) {
                  const o = n[i];
                  if (!e.hasOwnProperty(o) || t[o] !== e[o]) return !1;
                }
                return !0;
              })(l.params, u.params)
            ) {
              const m = [],
                y = o.matchStyles(l.value, l.params, m),
                v = o.matchStyles(u.value, u.params, m);
              m.length
                ? this._engine.reportError(m)
                : this._engine.afterFlush(() => {
                    ei(e, y), Gn(e, v);
                  });
            }
            return;
          }
          const f = Xt(this._engine.playersByElement, e, []);
          f.forEach((m) => {
            m.namespaceId == this.id &&
              m.triggerName == n &&
              m.queued &&
              m.destroy();
          });
          let h = o.matchTransition(l.value, u.value, e, u.params),
            p = !1;
          if (!h) {
            if (!i) return;
            (h = o.fallbackTransition), (p = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: n,
              transition: h,
              fromState: l,
              toState: u,
              player: s,
              isFallbackTransition: p,
            }),
            p ||
              (fn(e, Cb),
              s.onStart(() => {
                to(e, Cb);
              })),
            s.onDone(() => {
              let m = this.players.indexOf(s);
              m >= 0 && this.players.splice(m, 1);
              const y = this._engine.playersByElement.get(e);
              if (y) {
                let v = y.indexOf(s);
                v >= 0 && y.splice(v, 1);
              }
            }),
            this.players.push(s),
            f.push(s),
            s
          );
        }
        deregister(e) {
          this._triggers.delete(e),
            this._engine.statesByElement.forEach((n) => n.delete(e)),
            this._elementListeners.forEach((n, r) => {
              this._elementListeners.set(
                r,
                n.filter((i) => i.name != e)
              );
            });
        }
        clearElementCache(e) {
          this._engine.statesByElement.delete(e),
            this._elementListeners.delete(e);
          const n = this._engine.playersByElement.get(e);
          n &&
            (n.forEach((r) => r.destroy()),
            this._engine.playersByElement.delete(e));
        }
        _signalRemovalForInnerTriggers(e, n) {
          const r = this._engine.driver.query(e, Ml, !0);
          r.forEach((i) => {
            if (i[dn]) return;
            const o = this._engine.fetchNamespacesByElement(i);
            o.size
              ? o.forEach((s) => s.triggerLeaveAnimation(i, n, !1, !0))
              : this.clearElementCache(i);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              r.forEach((i) => this.clearElementCache(i))
            );
        }
        triggerLeaveAnimation(e, n, r, i) {
          const o = this._engine.statesByElement.get(e),
            s = new Map();
          if (o) {
            const a = [];
            if (
              (o.forEach((l, u) => {
                if ((s.set(u, l.value), this._triggers.has(u))) {
                  const c = this.trigger(e, u, ms, i);
                  c && a.push(c);
                }
              }),
              a.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, e, !0, n, s),
                r && Tr(a).onDone(() => this._engine.processLeaveNode(e)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(e) {
          const n = this._elementListeners.get(e),
            r = this._engine.statesByElement.get(e);
          if (n && r) {
            const i = new Set();
            n.forEach((o) => {
              const s = o.name;
              if (i.has(s)) return;
              i.add(s);
              const l = this._triggers.get(s).fallbackTransition,
                u = r.get(s) || th,
                c = new eh(ms),
                d = new nh(this.id, s, e);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: e,
                  triggerName: s,
                  transition: l,
                  fromState: u,
                  toState: c,
                  player: d,
                  isFallbackTransition: !0,
                });
            });
          }
        }
        removeNode(e, n) {
          const r = this._engine;
          if (
            (e.childElementCount && this._signalRemovalForInnerTriggers(e, n),
            this.triggerLeaveAnimation(e, n, !0))
          )
            return;
          let i = !1;
          if (r.totalAnimations) {
            const o = r.players.length ? r.playersByQueriedElement.get(e) : [];
            if (o && o.length) i = !0;
            else {
              let s = e;
              for (; (s = s.parentNode); )
                if (r.statesByElement.get(s)) {
                  i = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(e), i))
            r.markElementAsRemoved(this.id, e, !1, n);
          else {
            const o = e[dn];
            (!o || o === Mb) &&
              (r.afterFlush(() => this.clearElementCache(e)),
              r.destroyInnerAnimations(e),
              r._onRemovalComplete(e, n));
          }
        }
        insertNode(e, n) {
          fn(e, this._hostClassName);
        }
        drainQueuedTransitions(e) {
          const n = [];
          return (
            this._queue.forEach((r) => {
              const i = r.player;
              if (i.destroyed) return;
              const o = r.element,
                s = this._elementListeners.get(o);
              s &&
                s.forEach((a) => {
                  if (a.name == r.triggerName) {
                    const l = Vf(
                      o,
                      r.triggerName,
                      r.fromState.value,
                      r.toState.value
                    );
                    (l._data = e), kf(r.player, a.phase, l, a.callback);
                  }
                }),
                i.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      i.destroy();
                    })
                  : n.push(r);
            }),
            (this._queue = []),
            n.sort((r, i) => {
              const o = r.transition.ast.depCount,
                s = i.transition.ast.depCount;
              return 0 == o || 0 == s
                ? o - s
                : this._engine.driver.containsElement(r.element, i.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(e) {
          this.players.forEach((n) => n.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, e);
        }
        elementContainsData(e) {
          let n = !1;
          return (
            this._elementListeners.has(e) && (n = !0),
            (n = !!this._queue.find((r) => r.element === e) || n),
            n
          );
        }
      }
      class eL {
        _onRemovalComplete(e, n) {
          this.onRemovalComplete(e, n);
        }
        constructor(e, n, r) {
          (this.bodyNode = e),
            (this.driver = n),
            (this._normalizer = r),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (i, o) => {});
        }
        get queuedPlayers() {
          const e = [];
          return (
            this._namespaceList.forEach((n) => {
              n.players.forEach((r) => {
                r.queued && e.push(r);
              });
            }),
            e
          );
        }
        createNamespace(e, n) {
          const r = new J1(e, n, this);
          return (
            this.bodyNode && this.driver.containsElement(this.bodyNode, n)
              ? this._balanceNamespaceList(r, n)
              : (this.newHostElements.set(n, r), this.collectEnterElement(n)),
            (this._namespaceLookup[e] = r)
          );
        }
        _balanceNamespaceList(e, n) {
          const r = this._namespaceList,
            i = this.namespacesByHostElement;
          if (r.length - 1 >= 0) {
            let s = !1,
              a = this.driver.getParentElement(n);
            for (; a; ) {
              const l = i.get(a);
              if (l) {
                const u = r.indexOf(l);
                r.splice(u + 1, 0, e), (s = !0);
                break;
              }
              a = this.driver.getParentElement(a);
            }
            s || r.unshift(e);
          } else r.push(e);
          return i.set(n, e), e;
        }
        register(e, n) {
          let r = this._namespaceLookup[e];
          return r || (r = this.createNamespace(e, n)), r;
        }
        registerTrigger(e, n, r) {
          let i = this._namespaceLookup[e];
          i && i.register(n, r) && this.totalAnimations++;
        }
        destroy(e, n) {
          if (!e) return;
          const r = this._fetchNamespace(e);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(r.hostElement),
              delete this._namespaceLookup[e];
            const i = this._namespaceList.indexOf(r);
            i >= 0 && this._namespaceList.splice(i, 1);
          }),
            this.afterFlushAnimationsDone(() => r.destroy(n));
        }
        _fetchNamespace(e) {
          return this._namespaceLookup[e];
        }
        fetchNamespacesByElement(e) {
          const n = new Set(),
            r = this.statesByElement.get(e);
          if (r)
            for (let i of r.values())
              if (i.namespaceId) {
                const o = this._fetchNamespace(i.namespaceId);
                o && n.add(o);
              }
          return n;
        }
        trigger(e, n, r, i) {
          if (Rl(n)) {
            const o = this._fetchNamespace(e);
            if (o) return o.trigger(n, r, i), !0;
          }
          return !1;
        }
        insertNode(e, n, r, i) {
          if (!Rl(n)) return;
          const o = n[dn];
          if (o && o.setForRemoval) {
            (o.setForRemoval = !1), (o.setForMove = !0);
            const s = this.collectedLeaveElements.indexOf(n);
            s >= 0 && this.collectedLeaveElements.splice(s, 1);
          }
          if (e) {
            const s = this._fetchNamespace(e);
            s && s.insertNode(n, r);
          }
          i && this.collectEnterElement(n);
        }
        collectEnterElement(e) {
          this.collectedEnterElements.push(e);
        }
        markElementAsDisabled(e, n) {
          n
            ? this.disabledNodes.has(e) ||
              (this.disabledNodes.add(e), fn(e, Jf))
            : this.disabledNodes.has(e) &&
              (this.disabledNodes.delete(e), to(e, Jf));
        }
        removeNode(e, n, r) {
          if (Rl(n)) {
            const i = e ? this._fetchNamespace(e) : null;
            i ? i.removeNode(n, r) : this.markElementAsRemoved(e, n, !1, r);
            const o = this.namespacesByHostElement.get(n);
            o && o.id !== e && o.removeNode(n, r);
          } else this._onRemovalComplete(n, r);
        }
        markElementAsRemoved(e, n, r, i, o) {
          this.collectedLeaveElements.push(n),
            (n[dn] = {
              namespaceId: e,
              setForRemoval: i,
              hasAnimation: r,
              removedBeforeQueried: !1,
              previousTriggersValues: o,
            });
        }
        listen(e, n, r, i, o) {
          return Rl(n) ? this._fetchNamespace(e).listen(n, r, i, o) : () => {};
        }
        _buildInstruction(e, n, r, i, o) {
          return e.transition.build(
            this.driver,
            e.element,
            e.fromState.value,
            e.toState.value,
            r,
            i,
            e.fromState.options,
            e.toState.options,
            n,
            o
          );
        }
        destroyInnerAnimations(e) {
          let n = this.driver.query(e, Ml, !0);
          n.forEach((r) => this.destroyActiveAnimationsForElement(r)),
            0 != this.playersByQueriedElement.size &&
              ((n = this.driver.query(e, Uf, !0)),
              n.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
        }
        destroyActiveAnimationsForElement(e) {
          const n = this.playersByElement.get(e);
          n &&
            n.forEach((r) => {
              r.queued ? (r.markedForDestroy = !0) : r.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(e) {
          const n = this.playersByQueriedElement.get(e);
          n && n.forEach((r) => r.finish());
        }
        whenRenderingDone() {
          return new Promise((e) => {
            if (this.players.length) return Tr(this.players).onDone(() => e());
            e();
          });
        }
        processLeaveNode(e) {
          const n = e[dn];
          if (n && n.setForRemoval) {
            if (((e[dn] = Mb), n.namespaceId)) {
              this.destroyInnerAnimations(e);
              const r = this._fetchNamespace(n.namespaceId);
              r && r.clearElementCache(e);
            }
            this._onRemovalComplete(e, n.setForRemoval);
          }
          e.classList?.contains(Jf) && this.markElementAsDisabled(e, !1),
            this.driver.query(e, ".ng-animate-disabled", !0).forEach((r) => {
              this.markElementAsDisabled(r, !1);
            });
        }
        flush(e = -1) {
          let n = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((r, i) =>
                this._balanceNamespaceList(r, i)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let r = 0; r < this.collectedEnterElements.length; r++)
              fn(this.collectedEnterElements[r], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const r = [];
            try {
              n = this._flushAnimations(r, e);
            } finally {
              for (let i = 0; i < r.length; i++) r[i]();
            }
          } else
            for (let r = 0; r < this.collectedLeaveElements.length; r++)
              this.processLeaveNode(this.collectedLeaveElements[r]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach((r) => r()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const r = this._whenQuietFns;
            (this._whenQuietFns = []),
              n.length
                ? Tr(n).onDone(() => {
                    r.forEach((i) => i());
                  })
                : r.forEach((i) => i());
          }
        }
        reportError(e) {
          throw (function r1(t) {
            return new _(3402, !1);
          })();
        }
        _flushAnimations(e, n) {
          const r = new Fl(),
            i = [],
            o = new Map(),
            s = [],
            a = new Map(),
            l = new Map(),
            u = new Map(),
            c = new Set();
          this.disabledNodes.forEach((N) => {
            c.add(N);
            const x = this.driver.query(N, ".ng-animate-queued", !0);
            for (let L = 0; L < x.length; L++) c.add(x[L]);
          });
          const d = this.bodyNode,
            f = Array.from(this.statesByElement.keys()),
            h = Tb(f, this.collectedEnterElements),
            p = new Map();
          let m = 0;
          h.forEach((N, x) => {
            const L = jf + m++;
            p.set(x, L), N.forEach((se) => fn(se, L));
          });
          const y = [],
            v = new Set(),
            g = new Set();
          for (let N = 0; N < this.collectedLeaveElements.length; N++) {
            const x = this.collectedLeaveElements[N],
              L = x[dn];
            L &&
              L.setForRemoval &&
              (y.push(x),
              v.add(x),
              L.hasAnimation
                ? this.driver
                    .query(x, ".ng-star-inserted", !0)
                    .forEach((se) => v.add(se))
                : g.add(x));
          }
          const b = new Map(),
            T = Tb(f, Array.from(v));
          T.forEach((N, x) => {
            const L = wl + m++;
            b.set(x, L), N.forEach((se) => fn(se, L));
          }),
            e.push(() => {
              h.forEach((N, x) => {
                const L = p.get(x);
                N.forEach((se) => to(se, L));
              }),
                T.forEach((N, x) => {
                  const L = b.get(x);
                  N.forEach((se) => to(se, L));
                }),
                y.forEach((N) => {
                  this.processLeaveNode(N);
                });
            });
          const z = [],
            Pe = [];
          for (let N = this._namespaceList.length - 1; N >= 0; N--)
            this._namespaceList[N].drainQueuedTransitions(n).forEach((L) => {
              const se = L.player,
                it = L.element;
              if ((z.push(se), this.collectedEnterElements.length)) {
                const vt = it[dn];
                if (vt && vt.setForMove) {
                  if (
                    vt.previousTriggersValues &&
                    vt.previousTriggersValues.has(L.triggerName)
                  ) {
                    const si = vt.previousTriggersValues.get(L.triggerName),
                      hn = this.statesByElement.get(L.element);
                    if (hn && hn.has(L.triggerName)) {
                      const Wl = hn.get(L.triggerName);
                      (Wl.value = si), hn.set(L.triggerName, Wl);
                    }
                  }
                  return void se.destroy();
                }
              }
              const qn = !d || !this.driver.containsElement(d, it),
                en = b.get(it),
                Fr = p.get(it),
                ke = this._buildInstruction(L, r, Fr, en, qn);
              if (ke.errors && ke.errors.length) return void Pe.push(ke);
              if (qn)
                return (
                  se.onStart(() => ei(it, ke.fromStyles)),
                  se.onDestroy(() => Gn(it, ke.toStyles)),
                  void i.push(se)
                );
              if (L.isFallbackTransition)
                return (
                  se.onStart(() => ei(it, ke.fromStyles)),
                  se.onDestroy(() => Gn(it, ke.toStyles)),
                  void i.push(se)
                );
              const Tw = [];
              ke.timelines.forEach((vt) => {
                (vt.stretchStartingKeyframe = !0),
                  this.disabledNodes.has(vt.element) || Tw.push(vt);
              }),
                (ke.timelines = Tw),
                r.append(it, ke.timelines),
                s.push({ instruction: ke, player: se, element: it }),
                ke.queriedElements.forEach((vt) => Xt(a, vt, []).push(se)),
                ke.preStyleProps.forEach((vt, si) => {
                  if (vt.size) {
                    let hn = l.get(si);
                    hn || l.set(si, (hn = new Set())),
                      vt.forEach((Wl, ph) => hn.add(ph));
                  }
                }),
                ke.postStyleProps.forEach((vt, si) => {
                  let hn = u.get(si);
                  hn || u.set(si, (hn = new Set())),
                    vt.forEach((Wl, ph) => hn.add(ph));
                });
            });
          if (Pe.length) {
            const N = [];
            Pe.forEach((x) => {
              N.push(
                (function o1(t, e) {
                  return new _(3505, !1);
                })()
              );
            }),
              z.forEach((x) => x.destroy()),
              this.reportError(N);
          }
          const rt = new Map(),
            dr = new Map();
          s.forEach((N) => {
            const x = N.element;
            r.has(x) &&
              (dr.set(x, x),
              this._beforeAnimationBuild(
                N.player.namespaceId,
                N.instruction,
                rt
              ));
          }),
            i.forEach((N) => {
              const x = N.element;
              this._getPreviousPlayers(
                x,
                !1,
                N.namespaceId,
                N.triggerName,
                null
              ).forEach((se) => {
                Xt(rt, x, []).push(se), se.destroy();
              });
            });
          const fr = y.filter((N) => Nb(N, l, u)),
            hr = new Map();
          Ib(hr, this.driver, g, u, lr).forEach((N) => {
            Nb(N, l, u) && fr.push(N);
          });
          const bs = new Map();
          h.forEach((N, x) => {
            Ib(bs, this.driver, new Set(N), l, Pf);
          }),
            fr.forEach((N) => {
              const x = hr.get(N),
                L = bs.get(N);
              hr.set(
                N,
                new Map([...(x?.entries() ?? []), ...(L?.entries() ?? [])])
              );
            });
          const oi = [],
            Sw = [],
            Iw = {};
          s.forEach((N) => {
            const { element: x, player: L, instruction: se } = N;
            if (r.has(x)) {
              if (c.has(x))
                return (
                  L.onDestroy(() => Gn(x, se.toStyles)),
                  (L.disabled = !0),
                  L.overrideTotalTime(se.totalTime),
                  void i.push(L)
                );
              let it = Iw;
              if (dr.size > 1) {
                let en = x;
                const Fr = [];
                for (; (en = en.parentNode); ) {
                  const ke = dr.get(en);
                  if (ke) {
                    it = ke;
                    break;
                  }
                  Fr.push(en);
                }
                Fr.forEach((ke) => dr.set(ke, it));
              }
              const qn = this._buildAnimation(L.namespaceId, se, rt, o, bs, hr);
              if ((L.setRealPlayer(qn), it === Iw)) oi.push(L);
              else {
                const en = this.playersByElement.get(it);
                en && en.length && (L.parentPlayer = Tr(en)), i.push(L);
              }
            } else
              ei(x, se.fromStyles),
                L.onDestroy(() => Gn(x, se.toStyles)),
                Sw.push(L),
                c.has(x) && i.push(L);
          }),
            Sw.forEach((N) => {
              const x = o.get(N.element);
              if (x && x.length) {
                const L = Tr(x);
                N.setRealPlayer(L);
              }
            }),
            i.forEach((N) => {
              N.parentPlayer ? N.syncPlayerEvents(N.parentPlayer) : N.destroy();
            });
          for (let N = 0; N < y.length; N++) {
            const x = y[N],
              L = x[dn];
            if ((to(x, wl), L && L.hasAnimation)) continue;
            let se = [];
            if (a.size) {
              let qn = a.get(x);
              qn && qn.length && se.push(...qn);
              let en = this.driver.query(x, Uf, !0);
              for (let Fr = 0; Fr < en.length; Fr++) {
                let ke = a.get(en[Fr]);
                ke && ke.length && se.push(...ke);
              }
            }
            const it = se.filter((qn) => !qn.destroyed);
            it.length ? iL(this, x, it) : this.processLeaveNode(x);
          }
          return (
            (y.length = 0),
            oi.forEach((N) => {
              this.players.push(N),
                N.onDone(() => {
                  N.destroy();
                  const x = this.players.indexOf(N);
                  this.players.splice(x, 1);
                }),
                N.play();
            }),
            oi
          );
        }
        elementContainsData(e, n) {
          let r = !1;
          const i = n[dn];
          return (
            i && i.setForRemoval && (r = !0),
            this.playersByElement.has(n) && (r = !0),
            this.playersByQueriedElement.has(n) && (r = !0),
            this.statesByElement.has(n) && (r = !0),
            this._fetchNamespace(e).elementContainsData(n) || r
          );
        }
        afterFlush(e) {
          this._flushFns.push(e);
        }
        afterFlushAnimationsDone(e) {
          this._whenQuietFns.push(e);
        }
        _getPreviousPlayers(e, n, r, i, o) {
          let s = [];
          if (n) {
            const a = this.playersByQueriedElement.get(e);
            a && (s = a);
          } else {
            const a = this.playersByElement.get(e);
            if (a) {
              const l = !o || o == ms;
              a.forEach((u) => {
                u.queued || (!l && u.triggerName != i) || s.push(u);
              });
            }
          }
          return (
            (r || i) &&
              (s = s.filter(
                (a) => !((r && r != a.namespaceId) || (i && i != a.triggerName))
              )),
            s
          );
        }
        _beforeAnimationBuild(e, n, r) {
          const o = n.element,
            s = n.isRemovalTransition ? void 0 : e,
            a = n.isRemovalTransition ? void 0 : n.triggerName;
          for (const l of n.timelines) {
            const u = l.element,
              c = u !== o,
              d = Xt(r, u, []);
            this._getPreviousPlayers(u, c, s, a, n.toState).forEach((h) => {
              const p = h.getRealPlayer();
              p.beforeDestroy && p.beforeDestroy(), h.destroy(), d.push(h);
            });
          }
          ei(o, n.fromStyles);
        }
        _buildAnimation(e, n, r, i, o, s) {
          const a = n.triggerName,
            l = n.element,
            u = [],
            c = new Set(),
            d = new Set(),
            f = n.timelines.map((p) => {
              const m = p.element;
              c.add(m);
              const y = m[dn];
              if (y && y.removedBeforeQueried)
                return new ds(p.duration, p.delay);
              const v = m !== l,
                g = (function oL(t) {
                  const e = [];
                  return Ab(t, e), e;
                })((r.get(m) || Y1).map((rt) => rt.getRealPlayer())).filter(
                  (rt) => !!rt.element && rt.element === m
                ),
                b = o.get(m),
                T = s.get(m),
                z = ob(this._normalizer, p.keyframes, b, T),
                Pe = this._buildPlayer(p, z, g);
              if ((p.subTimeline && i && d.add(m), v)) {
                const rt = new nh(e, a, m);
                rt.setRealPlayer(Pe), u.push(rt);
              }
              return Pe;
            });
          u.forEach((p) => {
            Xt(this.playersByQueriedElement, p.element, []).push(p),
              p.onDone(() =>
                (function tL(t, e, n) {
                  let r = t.get(e);
                  if (r) {
                    if (r.length) {
                      const i = r.indexOf(n);
                      r.splice(i, 1);
                    }
                    0 == r.length && t.delete(e);
                  }
                  return r;
                })(this.playersByQueriedElement, p.element, p)
              );
          }),
            c.forEach((p) => fn(p, fb));
          const h = Tr(f);
          return (
            h.onDestroy(() => {
              c.forEach((p) => to(p, fb)), Gn(l, n.toStyles);
            }),
            d.forEach((p) => {
              Xt(i, p, []).push(h);
            }),
            h
          );
        }
        _buildPlayer(e, n, r) {
          return n.length > 0
            ? this.driver.animate(
                e.element,
                n,
                e.duration,
                e.delay,
                e.easing,
                r
              )
            : new ds(e.duration, e.delay);
        }
      }
      class nh {
        constructor(e, n, r) {
          (this.namespaceId = e),
            (this.triggerName = n),
            (this.element = r),
            (this._player = new ds()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = new Map()),
            (this.destroyed = !1),
            (this.parentPlayer = null),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(e) {
          this._containsRealPlayer ||
            ((this._player = e),
            this._queuedCallbacks.forEach((n, r) => {
              n.forEach((i) => kf(e, r, void 0, i));
            }),
            this._queuedCallbacks.clear(),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(e.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(e) {
          this.totalTime = e;
        }
        syncPlayerEvents(e) {
          const n = this._player;
          n.triggerCallback && e.onStart(() => n.triggerCallback("start")),
            e.onDone(() => this.finish()),
            e.onDestroy(() => this.destroy());
        }
        _queueEvent(e, n) {
          Xt(this._queuedCallbacks, e, []).push(n);
        }
        onDone(e) {
          this.queued && this._queueEvent("done", e), this._player.onDone(e);
        }
        onStart(e) {
          this.queued && this._queueEvent("start", e), this._player.onStart(e);
        }
        onDestroy(e) {
          this.queued && this._queueEvent("destroy", e),
            this._player.onDestroy(e);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(e) {
          this.queued || this._player.setPosition(e);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(e) {
          const n = this._player;
          n.triggerCallback && n.triggerCallback(e);
        }
      }
      function Rl(t) {
        return t && 1 === t.nodeType;
      }
      function Sb(t, e) {
        const n = t.style.display;
        return (t.style.display = e ?? "none"), n;
      }
      function Ib(t, e, n, r, i) {
        const o = [];
        n.forEach((l) => o.push(Sb(l)));
        const s = [];
        r.forEach((l, u) => {
          const c = new Map();
          l.forEach((d) => {
            const f = e.computeStyle(u, d, i);
            c.set(d, f), (!f || 0 == f.length) && ((u[dn] = X1), s.push(u));
          }),
            t.set(u, c);
        });
        let a = 0;
        return n.forEach((l) => Sb(l, o[a++])), s;
      }
      function Tb(t, e) {
        const n = new Map();
        if ((t.forEach((a) => n.set(a, [])), 0 == e.length)) return n;
        const r = 1,
          i = new Set(e),
          o = new Map();
        function s(a) {
          if (!a) return r;
          let l = o.get(a);
          if (l) return l;
          const u = a.parentNode;
          return (l = n.has(u) ? u : i.has(u) ? r : s(u)), o.set(a, l), l;
        }
        return (
          e.forEach((a) => {
            const l = s(a);
            l !== r && n.get(l).push(a);
          }),
          n
        );
      }
      function fn(t, e) {
        t.classList?.add(e);
      }
      function to(t, e) {
        t.classList?.remove(e);
      }
      function iL(t, e, n) {
        Tr(n).onDone(() => t.processLeaveNode(e));
      }
      function Ab(t, e) {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          r instanceof rb ? Ab(r.players, e) : e.push(r);
        }
      }
      function Nb(t, e, n) {
        const r = n.get(t);
        if (!r) return !1;
        let i = e.get(t);
        return i ? r.forEach((o) => i.add(o)) : e.set(t, r), n.delete(t), !0;
      }
      class Pl {
        constructor(e, n, r) {
          (this.bodyNode = e),
            (this._driver = n),
            (this._normalizer = r),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (i, o) => {}),
            (this._transitionEngine = new eL(e, n, r)),
            (this._timelineEngine = new q1(e, n, r)),
            (this._transitionEngine.onRemovalComplete = (i, o) =>
              this.onRemovalComplete(i, o));
        }
        registerTrigger(e, n, r, i, o) {
          const s = e + "-" + i;
          let a = this._triggerCache[s];
          if (!a) {
            const l = [],
              c = qf(this._driver, o, l, []);
            if (l.length)
              throw (function Wk(t, e) {
                return new _(3404, !1);
              })();
            (a = (function U1(t, e, n) {
              return new $1(t, e, n);
            })(i, c, this._normalizer)),
              (this._triggerCache[s] = a);
          }
          this._transitionEngine.registerTrigger(n, i, a);
        }
        register(e, n) {
          this._transitionEngine.register(e, n);
        }
        destroy(e, n) {
          this._transitionEngine.destroy(e, n);
        }
        onInsert(e, n, r, i) {
          this._transitionEngine.insertNode(e, n, r, i);
        }
        onRemove(e, n, r) {
          this._transitionEngine.removeNode(e, n, r);
        }
        disableAnimations(e, n) {
          this._transitionEngine.markElementAsDisabled(e, n);
        }
        process(e, n, r, i) {
          if ("@" == r.charAt(0)) {
            const [o, s] = sb(r);
            this._timelineEngine.command(o, n, s, i);
          } else this._transitionEngine.trigger(e, n, r, i);
        }
        listen(e, n, r, i, o) {
          if ("@" == r.charAt(0)) {
            const [s, a] = sb(r);
            return this._timelineEngine.listen(s, n, a, o);
          }
          return this._transitionEngine.listen(e, n, r, i, o);
        }
        flush(e = -1) {
          this._transitionEngine.flush(e);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      let lL = (() => {
        class t {
          constructor(n, r, i) {
            (this._element = n),
              (this._startStyles = r),
              (this._endStyles = i),
              (this._state = 0);
            let o = t.initialStylesByElement.get(n);
            o || t.initialStylesByElement.set(n, (o = new Map())),
              (this._initialStyles = o);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Gn(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Gn(this._element, this._initialStyles),
                this._endStyles &&
                  (Gn(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (t.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (ei(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (ei(this._element, this._endStyles),
                  (this._endStyles = null)),
                Gn(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (t.initialStylesByElement = new WeakMap()), t;
      })();
      function rh(t) {
        let e = null;
        return (
          t.forEach((n, r) => {
            (function uL(t) {
              return "display" === t || "position" === t;
            })(r) && ((e = e || new Map()), e.set(r, n));
          }),
          e
        );
      }
      class Fb {
        constructor(e, n, r, i) {
          (this.element = e),
            (this.keyframes = n),
            (this.options = r),
            (this._specialStyles = i),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._originalOnDoneFns = []),
            (this._originalOnStartFns = []),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = new Map()),
            (this._duration = r.duration),
            (this._delay = r.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach((e) => e()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const e = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            e,
            this.options
          )),
            (this._finalKeyframe = e.length ? e[e.length - 1] : new Map()),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _convertKeyframesToObject(e) {
          const n = [];
          return (
            e.forEach((r) => {
              n.push(Object.fromEntries(r));
            }),
            n
          );
        }
        _triggerWebAnimation(e, n, r) {
          return e.animate(this._convertKeyframesToObject(n), r);
        }
        onStart(e) {
          this._originalOnStartFns.push(e), this._onStartFns.push(e);
        }
        onDone(e) {
          this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
        }
        onDestroy(e) {
          this._onDestroyFns.push(e);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach((e) => e()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._onStartFns = this._originalOnStartFns),
            (this._onDoneFns = this._originalOnDoneFns);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach((e) => e()),
            (this._onDestroyFns = []));
        }
        setPosition(e) {
          void 0 === this.domPlayer && this.init(),
            (this.domPlayer.currentTime = e * this.time);
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const e = new Map();
          this.hasStarted() &&
            this._finalKeyframe.forEach((r, i) => {
              "offset" !== i &&
                e.set(i, this._finished ? r : gb(this.element, i));
            }),
            (this.currentSnapshot = e);
        }
        triggerCallback(e) {
          const n = "start" === e ? this._onStartFns : this._onDoneFns;
          n.forEach((r) => r()), (n.length = 0);
        }
      }
      class cL {
        validateStyleProperty(e) {
          return !0;
        }
        validateAnimatableStyleProperty(e) {
          return !0;
        }
        matchesElement(e, n) {
          return !1;
        }
        containsElement(e, n) {
          return lb(e, n);
        }
        getParentElement(e) {
          return Bf(e);
        }
        query(e, n, r) {
          return ub(e, n, r);
        }
        computeStyle(e, n, r) {
          return window.getComputedStyle(e)[n];
        }
        animate(e, n, r, i, o, s = []) {
          const l = {
            duration: r,
            delay: i,
            fill: 0 == i ? "both" : "forwards",
          };
          o && (l.easing = o);
          const u = new Map(),
            c = s.filter((h) => h instanceof Fb);
          (function y1(t, e) {
            return 0 === t || 0 === e;
          })(r, i) &&
            c.forEach((h) => {
              h.currentSnapshot.forEach((p, m) => u.set(m, p));
            });
          let d = (function p1(t) {
            return t.length
              ? t[0] instanceof Map
                ? t
                : t.map((e) => hb(e))
              : [];
          })(n).map((h) => Ar(h));
          d = (function _1(t, e, n) {
            if (n.size && e.length) {
              let r = e[0],
                i = [];
              if (
                (n.forEach((o, s) => {
                  r.has(s) || i.push(s), r.set(s, o);
                }),
                i.length)
              )
                for (let o = 1; o < e.length; o++) {
                  let s = e[o];
                  i.forEach((a) => s.set(a, gb(t, a)));
                }
            }
            return e;
          })(e, d, u);
          const f = (function aL(t, e) {
            let n = null,
              r = null;
            return (
              Array.isArray(e) && e.length
                ? ((n = rh(e[0])), e.length > 1 && (r = rh(e[e.length - 1])))
                : e instanceof Map && (n = rh(e)),
              n || r ? new lL(t, n, r) : null
            );
          })(e, d);
          return new Fb(e, d, l, f);
        }
      }
      let dL = (() => {
        class t extends JE {
          constructor(n, r) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = n.createRenderer(r.body, {
                id: "0",
                encapsulation: Ot.None,
                styles: [],
                data: { animation: [] },
              }));
          }
          build(n) {
            const r = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const i = Array.isArray(n) ? eb(n) : n;
            return (
              Ob(this._renderer, null, r, "register", [i]),
              new fL(r, this._renderer)
            );
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(Ro), F(lt));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class fL extends Mk {
        constructor(e, n) {
          super(), (this._id = e), (this._renderer = n);
        }
        create(e, n) {
          return new hL(this._id, e, n || {}, this._renderer);
        }
      }
      class hL {
        constructor(e, n, r, i) {
          (this.id = e),
            (this.element = n),
            (this._renderer = i),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", r);
        }
        _listen(e, n) {
          return this._renderer.listen(this.element, `@@${this.id}:${e}`, n);
        }
        _command(e, ...n) {
          return Ob(this._renderer, this.element, this.id, e, n);
        }
        onDone(e) {
          this._listen("done", e);
        }
        onStart(e) {
          this._listen("start", e);
        }
        onDestroy(e) {
          this._listen("destroy", e);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset"), (this._started = !1);
        }
        setPosition(e) {
          this._command("setPosition", e);
        }
        getPosition() {
          return this._renderer.engine.players[+this.id]?.getPosition() ?? 0;
        }
      }
      function Ob(t, e, n, r, i) {
        return t.setProperty(e, `@@${n}:${r}`, i);
      }
      const xb = "@.disabled";
      let pL = (() => {
        class t {
          constructor(n, r, i) {
            (this.delegate = n),
              (this.engine = r),
              (this._zone = i),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (r.onRemovalComplete = (o, s) => {
                const a = s?.parentNode(o);
                a && s.removeChild(a, o);
              });
          }
          createRenderer(n, r) {
            const o = this.delegate.createRenderer(n, r);
            if (!(n && r && r.data && r.data.animation)) {
              let c = this._rendererCache.get(o);
              return (
                c ||
                  ((c = new Rb("", o, this.engine, () =>
                    this._rendererCache.delete(o)
                  )),
                  this._rendererCache.set(o, c)),
                c
              );
            }
            const s = r.id,
              a = r.id + "-" + this._currentId;
            this._currentId++, this.engine.register(a, n);
            const l = (c) => {
              Array.isArray(c)
                ? c.forEach(l)
                : this.engine.registerTrigger(s, a, n, c.name, c);
            };
            return r.data.animation.forEach(l), new mL(this, a, o, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(n, r, i) {
            n >= 0 && n < this._microtaskId
              ? this._zone.run(() => r(i))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach((o) => {
                        const [s, a] = o;
                        s(a);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([r, i]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(Ro), F(Pl), F(Be));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Rb {
        constructor(e, n, r, i) {
          (this.namespaceId = e),
            (this.delegate = n),
            (this.engine = r),
            (this._onDestroy = i),
            (this.destroyNode = this.delegate.destroyNode
              ? (o) => n.destroyNode(o)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy(),
            this._onDestroy?.();
        }
        createElement(e, n) {
          return this.delegate.createElement(e, n);
        }
        createComment(e) {
          return this.delegate.createComment(e);
        }
        createText(e) {
          return this.delegate.createText(e);
        }
        appendChild(e, n) {
          this.delegate.appendChild(e, n),
            this.engine.onInsert(this.namespaceId, n, e, !1);
        }
        insertBefore(e, n, r, i = !0) {
          this.delegate.insertBefore(e, n, r),
            this.engine.onInsert(this.namespaceId, n, e, i);
        }
        removeChild(e, n, r) {
          this.engine.onRemove(this.namespaceId, n, this.delegate);
        }
        selectRootElement(e, n) {
          return this.delegate.selectRootElement(e, n);
        }
        parentNode(e) {
          return this.delegate.parentNode(e);
        }
        nextSibling(e) {
          return this.delegate.nextSibling(e);
        }
        setAttribute(e, n, r, i) {
          this.delegate.setAttribute(e, n, r, i);
        }
        removeAttribute(e, n, r) {
          this.delegate.removeAttribute(e, n, r);
        }
        addClass(e, n) {
          this.delegate.addClass(e, n);
        }
        removeClass(e, n) {
          this.delegate.removeClass(e, n);
        }
        setStyle(e, n, r, i) {
          this.delegate.setStyle(e, n, r, i);
        }
        removeStyle(e, n, r) {
          this.delegate.removeStyle(e, n, r);
        }
        setProperty(e, n, r) {
          "@" == n.charAt(0) && n == xb
            ? this.disableAnimations(e, !!r)
            : this.delegate.setProperty(e, n, r);
        }
        setValue(e, n) {
          this.delegate.setValue(e, n);
        }
        listen(e, n, r) {
          return this.delegate.listen(e, n, r);
        }
        disableAnimations(e, n) {
          this.engine.disableAnimations(e, n);
        }
      }
      class mL extends Rb {
        constructor(e, n, r, i, o) {
          super(n, r, i, o), (this.factory = e), (this.namespaceId = n);
        }
        setProperty(e, n, r) {
          "@" == n.charAt(0)
            ? "." == n.charAt(1) && n == xb
              ? this.disableAnimations(e, (r = void 0 === r || !!r))
              : this.engine.process(this.namespaceId, e, n.slice(1), r)
            : this.delegate.setProperty(e, n, r);
        }
        listen(e, n, r) {
          if ("@" == n.charAt(0)) {
            const i = (function gL(t) {
              switch (t) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return t;
              }
            })(e);
            let o = n.slice(1),
              s = "";
            return (
              "@" != o.charAt(0) &&
                ([o, s] = (function yL(t) {
                  const e = t.indexOf(".");
                  return [t.substring(0, e), t.slice(e + 1)];
                })(o)),
              this.engine.listen(this.namespaceId, i, o, s, (a) => {
                this.factory.scheduleListenerCallback(a._data || -1, r, a);
              })
            );
          }
          return this.delegate.listen(e, n, r);
        }
      }
      const Pb = [
          { provide: JE, useClass: dL },
          {
            provide: Yf,
            useFactory: function vL() {
              return new V1();
            },
          },
          {
            provide: Pl,
            useClass: (() => {
              class t extends Pl {
                constructor(n, r, i, o) {
                  super(n.body, r, i);
                }
                ngOnDestroy() {
                  this.flush();
                }
              }
              return (
                (t.ɵfac = function (n) {
                  return new (n || t)(F(lt), F(Hf), F(Yf), F(Xi));
                }),
                (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
                t
              );
            })(),
          },
          {
            provide: Ro,
            useFactory: function DL(t, e, n) {
              return new pL(t, e, n);
            },
            deps: [cf, Pl, Be],
          },
        ],
        ih = [
          { provide: Hf, useFactory: () => new cL() },
          { provide: eg, useValue: "BrowserAnimations" },
          ...Pb,
        ],
        kb = [
          { provide: Hf, useClass: cb },
          { provide: eg, useValue: "NoopAnimations" },
          ...Pb,
        ];
      let oh,
        EL = (() => {
          class t {
            static withConfig(n) {
              return { ngModule: t, providers: n.disableAnimations ? kb : ih };
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = on({ type: t })),
            (t.ɵinj = zt({ providers: ih, imports: [HD] })),
            t
          );
        })();
      try {
        oh = typeof Intl < "u" && Intl.v8BreakIterator;
      } catch {
        oh = !1;
      }
      let gs,
        Lb = (() => {
          class t {
            constructor(n) {
              (this._platformId = n),
                (this.isBrowser = this._platformId
                  ? (function gR(t) {
                      return t === ED;
                    })(this._platformId)
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !oh) &&
                  typeof CSS < "u" &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(F(zr));
            }),
            (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })();
      function Ll(t) {
        return (function bL() {
          if (null == gs && typeof window < "u")
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (gs = !0) })
              );
            } finally {
              gs = gs || !1;
            }
          return gs;
        })()
          ? t
          : !!t.capture;
      }
      function Bb(t) {
        return Array.isArray(t) ? t : [t];
      }
      function Hb(t) {
        return t instanceof Zt ? t.nativeElement : t;
      }
      function jb(t, e, n) {
        t ? Kn(n, t, e) : e();
      }
      function ah(...t) {
        return (function PL() {
          return Ah(1);
        })()(li(t, so(t)));
      }
      function Ub(t) {
        return t <= 0
          ? () => Ql
          : ye((e, n) => {
              let r = 0;
              e.subscribe(
                Te(n, (i) => {
                  ++r <= t && (n.next(i), t <= r && n.complete());
                })
              );
            });
      }
      function $b(t, e) {
        return ye((n, r) => {
          let i = 0;
          n.subscribe(Te(r, (o) => t.call(e, o, i++) && r.next(o)));
        });
      }
      class LL extends de {
        constructor(e, n) {
          super();
        }
        schedule(e, n = 0) {
          return this;
        }
      }
      const Bl = {
          setInterval(t, e, ...n) {
            const { delegate: r } = Bl;
            return r?.setInterval
              ? r.setInterval(t, e, ...n)
              : setInterval(t, e, ...n);
          },
          clearInterval(t) {
            const { delegate: e } = Bl;
            return (e?.clearInterval || clearInterval)(t);
          },
          delegate: void 0,
        },
        zb = { now: () => (zb.delegate || Date).now(), delegate: void 0 };
      class ys {
        constructor(e, n = ys.now) {
          (this.schedulerActionCtor = e), (this.now = n);
        }
        schedule(e, n = 0, r) {
          return new this.schedulerActionCtor(this, e).schedule(r, n);
        }
      }
      ys.now = zb.now;
      const HL = new (class BL extends ys {
        constructor(e, n = ys.now) {
          super(e, n), (this.actions = []), (this._active = !1);
        }
        flush(e) {
          const { actions: n } = this;
          if (this._active) return void n.push(e);
          let r;
          this._active = !0;
          do {
            if ((r = e.execute(e.state, e.delay))) break;
          } while ((e = n.shift()));
          if (((this._active = !1), r)) {
            for (; (e = n.shift()); ) e.unsubscribe();
            throw r;
          }
        }
      })(
        class VL extends LL {
          constructor(e, n) {
            super(e, n),
              (this.scheduler = e),
              (this.work = n),
              (this.pending = !1);
          }
          schedule(e, n = 0) {
            var r;
            if (this.closed) return this;
            this.state = e;
            const i = this.id,
              o = this.scheduler;
            return (
              null != i && (this.id = this.recycleAsyncId(o, i, n)),
              (this.pending = !0),
              (this.delay = n),
              (this.id =
                null !== (r = this.id) && void 0 !== r
                  ? r
                  : this.requestAsyncId(o, this.id, n)),
              this
            );
          }
          requestAsyncId(e, n, r = 0) {
            return Bl.setInterval(e.flush.bind(e, this), r);
          }
          recycleAsyncId(e, n, r = 0) {
            if (null != r && this.delay === r && !1 === this.pending) return n;
            null != n && Bl.clearInterval(n);
          }
          execute(e, n) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            const r = this._execute(e, n);
            if (r) return r;
            !1 === this.pending &&
              null != this.id &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
          }
          _execute(e, n) {
            let i,
              r = !1;
            try {
              this.work(e);
            } catch (o) {
              (r = !0),
                (i = o || new Error("Scheduled action threw falsy error"));
            }
            if (r) return this.unsubscribe(), i;
          }
          unsubscribe() {
            if (!this.closed) {
              const { id: e, scheduler: n } = this,
                { actions: r } = n;
              (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                De(r, this),
                null != e && (this.id = this.recycleAsyncId(n, e, null)),
                (this.delay = null),
                super.unsubscribe();
            }
          }
        }
      );
      function UL(...t) {
        const e = so(t);
        return ye((n, r) => {
          (e ? ah(t, n, e) : ah(t, n)).subscribe(r);
        });
      }
      function $L(t) {
        return ye((e, n) => {
          nn(t).subscribe(Te(n, () => n.complete(), Je)),
            !n.closed && e.subscribe(n);
        });
      }
      const Gb = new Set();
      let ri,
        zL = (() => {
          class t {
            constructor(n, r) {
              (this._platform = n),
                (this._nonce = r),
                (this._matchMedia =
                  this._platform.isBrowser && window.matchMedia
                    ? window.matchMedia.bind(window)
                    : qL);
            }
            matchMedia(n) {
              return (
                (this._platform.WEBKIT || this._platform.BLINK) &&
                  (function GL(t, e) {
                    if (!Gb.has(t))
                      try {
                        ri ||
                          ((ri = document.createElement("style")),
                          e && (ri.nonce = e),
                          ri.setAttribute("type", "text/css"),
                          document.head.appendChild(ri)),
                          ri.sheet &&
                            (ri.sheet.insertRule(`@media ${t} {body{ }}`, 0),
                            Gb.add(t));
                      } catch (n) {
                        console.error(n);
                      }
                  })(n, this._nonce),
                this._matchMedia(n)
              );
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(F(Lb), F(pc, 8));
            }),
            (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })();
      function qL(t) {
        return {
          matches: "all" === t || "" === t,
          media: t,
          addListener: () => {},
          removeListener: () => {},
        };
      }
      let WL = (() => {
        class t {
          constructor(n, r) {
            (this._mediaMatcher = n),
              (this._zone = r),
              (this._queries = new Map()),
              (this._destroySubject = new ct());
          }
          ngOnDestroy() {
            this._destroySubject.next(), this._destroySubject.complete();
          }
          isMatched(n) {
            return qb(Bb(n)).some((i) => this._registerQuery(i).mql.matches);
          }
          observe(n) {
            let o = (function xL(...t) {
              const e = so(t),
                n = Nh(t),
                { args: r, keys: i } = GD(t);
              if (0 === r.length) return li([], e);
              const o = new Fe(
                (function RL(t, e, n = Ct) {
                  return (r) => {
                    jb(
                      e,
                      () => {
                        const { length: i } = t,
                          o = new Array(i);
                        let s = i,
                          a = i;
                        for (let l = 0; l < i; l++)
                          jb(
                            e,
                            () => {
                              const u = li(t[l], e);
                              let c = !1;
                              u.subscribe(
                                Te(
                                  r,
                                  (d) => {
                                    (o[l] = d),
                                      c || ((c = !0), a--),
                                      a || r.next(n(o.slice()));
                                  },
                                  () => {
                                    --s || r.complete();
                                  }
                                )
                              );
                            },
                            r
                          );
                      },
                      r
                    );
                  };
                })(r, e, i ? (s) => WD(i, s) : Ct)
              );
              return n ? o.pipe(qD(n)) : o;
            })(qb(Bb(n)).map((s) => this._registerQuery(s).observable));
            return (
              (o = ah(
                o.pipe(Ub(1)),
                o.pipe(
                  (function kL(t) {
                    return $b((e, n) => t <= n);
                  })(1),
                  (function jL(t, e = HL) {
                    return ye((n, r) => {
                      let i = null,
                        o = null,
                        s = null;
                      const a = () => {
                        if (i) {
                          i.unsubscribe(), (i = null);
                          const u = o;
                          (o = null), r.next(u);
                        }
                      };
                      function l() {
                        const u = s + t,
                          c = e.now();
                        if (c < u)
                          return (
                            (i = this.schedule(void 0, u - c)), void r.add(i)
                          );
                        a();
                      }
                      n.subscribe(
                        Te(
                          r,
                          (u) => {
                            (o = u),
                              (s = e.now()),
                              i || ((i = e.schedule(l, t)), r.add(i));
                          },
                          () => {
                            a(), r.complete();
                          },
                          void 0,
                          () => {
                            o = i = null;
                          }
                        )
                      );
                    });
                  })(0)
                )
              )),
              o.pipe(
                Ae((s) => {
                  const a = { matches: !1, breakpoints: {} };
                  return (
                    s.forEach(({ matches: l, query: u }) => {
                      (a.matches = a.matches || l), (a.breakpoints[u] = l);
                    }),
                    a
                  );
                })
              )
            );
          }
          _registerQuery(n) {
            if (this._queries.has(n)) return this._queries.get(n);
            const r = this._mediaMatcher.matchMedia(n),
              o = {
                observable: new Fe((s) => {
                  const a = (l) => this._zone.run(() => s.next(l));
                  return (
                    r.addListener(a),
                    () => {
                      r.removeListener(a);
                    }
                  );
                }).pipe(
                  UL(r),
                  Ae(({ matches: s }) => ({ query: n, matches: s })),
                  $L(this._destroySubject)
                ),
                mql: r,
              };
            return this._queries.set(n, o), o;
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(zL), F(Be));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function qb(t) {
        return t
          .map((e) => e.split(","))
          .reduce((e, n) => e.concat(n))
          .map((e) => e.trim());
      }
      const Qb = "cdk-high-contrast-black-on-white",
        Yb = "cdk-high-contrast-white-on-black",
        lh = "cdk-high-contrast-active";
      let iV = (() => {
          class t {
            constructor(n, r) {
              (this._platform = n),
                (this._document = r),
                (this._breakpointSubscription = ve(WL)
                  .observe("(forced-colors: active)")
                  .subscribe(() => {
                    this._hasCheckedHighContrastMode &&
                      ((this._hasCheckedHighContrastMode = !1),
                      this._applyBodyHighContrastModeCssClasses());
                  }));
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const n = this._document.createElement("div");
              (n.style.backgroundColor = "rgb(1,2,3)"),
                (n.style.position = "absolute"),
                this._document.body.appendChild(n);
              const r = this._document.defaultView || window,
                i = r && r.getComputedStyle ? r.getComputedStyle(n) : null,
                o = ((i && i.backgroundColor) || "").replace(/ /g, "");
              switch ((n.remove(), o)) {
                case "rgb(0,0,0)":
                case "rgb(45,50,54)":
                case "rgb(32,32,32)":
                  return 2;
                case "rgb(255,255,255)":
                case "rgb(255,250,239)":
                  return 1;
              }
              return 0;
            }
            ngOnDestroy() {
              this._breakpointSubscription.unsubscribe();
            }
            _applyBodyHighContrastModeCssClasses() {
              if (
                !this._hasCheckedHighContrastMode &&
                this._platform.isBrowser &&
                this._document.body
              ) {
                const n = this._document.body.classList;
                n.remove(lh, Qb, Yb), (this._hasCheckedHighContrastMode = !0);
                const r = this.getHighContrastMode();
                1 === r ? n.add(lh, Qb) : 2 === r && n.add(lh, Yb);
              }
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(F(Lb), F(lt));
            }),
            (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        Xb = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = on({ type: t })),
            (t.ɵinj = zt({})),
            t
          );
        })();
      const lV = new C("mat-sanity-checks", {
        providedIn: "root",
        factory: function aV() {
          return !0;
        },
      });
      let tw = (() => {
        class t {
          constructor(n, r, i) {
            (this._sanityChecks = r),
              (this._document = i),
              (this._hasDoneGlobalChecks = !1),
              n._applyBodyHighContrastModeCssClasses(),
              this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
          }
          _checkIsEnabled(n) {
            return (
              !(function ML() {
                return (
                  (typeof __karma__ < "u" && !!__karma__) ||
                  (typeof jasmine < "u" && !!jasmine) ||
                  (typeof jest < "u" && !!jest) ||
                  (typeof Mocha < "u" && !!Mocha)
                );
              })() &&
              ("boolean" == typeof this._sanityChecks
                ? this._sanityChecks
                : !!this._sanityChecks[n])
            );
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(iV), F(lV, 8), F(lt));
          }),
          (t.ɵmod = on({ type: t })),
          (t.ɵinj = zt({ imports: [Xb, Xb] })),
          t
        );
      })();
      function uV(t, e) {
        return class extends t {
          get color() {
            return this._color;
          }
          set color(n) {
            const r = n || this.defaultColor;
            r !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  `mat-${this._color}`
                ),
              r && this._elementRef.nativeElement.classList.add(`mat-${r}`),
              (this._color = r));
          }
          constructor(...n) {
            super(...n), (this.defaultColor = e), (this.color = e);
          }
        };
      }
      class dV {
        constructor(e, n, r, i = !1) {
          (this._renderer = e),
            (this.element = n),
            (this.config = r),
            (this._animationForciblyDisabledThroughCss = i),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const nw = Ll({ passive: !0, capture: !0 });
      class fV {
        constructor() {
          (this._events = new Map()),
            (this._delegateEventHandler = (e) => {
              const n = (function CL(t) {
                return t.composedPath ? t.composedPath()[0] : t.target;
              })(e);
              n &&
                this._events.get(e.type)?.forEach((r, i) => {
                  (i === n || i.contains(n)) &&
                    r.forEach((o) => o.handleEvent(e));
                });
            });
        }
        addHandler(e, n, r, i) {
          const o = this._events.get(n);
          if (o) {
            const s = o.get(r);
            s ? s.add(i) : o.set(r, new Set([i]));
          } else
            this._events.set(n, new Map([[r, new Set([i])]])),
              e.runOutsideAngular(() => {
                document.addEventListener(n, this._delegateEventHandler, nw);
              });
        }
        removeHandler(e, n, r) {
          const i = this._events.get(e);
          if (!i) return;
          const o = i.get(n);
          o &&
            (o.delete(r),
            0 === o.size && i.delete(n),
            0 === i.size &&
              (this._events.delete(e),
              document.removeEventListener(e, this._delegateEventHandler, nw)));
        }
      }
      const rw = { enterDuration: 225, exitDuration: 150 },
        iw = Ll({ passive: !0, capture: !0 }),
        ow = ["mousedown", "touchstart"],
        sw = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class Hl {
        constructor(e, n, r, i) {
          (this._target = e),
            (this._ngZone = n),
            (this._platform = i),
            (this._isPointerDown = !1),
            (this._activeRipples = new Map()),
            (this._pointerUpEventsRegistered = !1),
            i.isBrowser && (this._containerElement = Hb(r));
        }
        fadeInRipple(e, n, r = {}) {
          const i = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            o = { ...rw, ...r.animation };
          r.centered &&
            ((e = i.left + i.width / 2), (n = i.top + i.height / 2));
          const s =
              r.radius ||
              (function pV(t, e, n) {
                const r = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                  i = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                return Math.sqrt(r * r + i * i);
              })(e, n, i),
            a = e - i.left,
            l = n - i.top,
            u = o.enterDuration,
            c = document.createElement("div");
          c.classList.add("mat-ripple-element"),
            (c.style.left = a - s + "px"),
            (c.style.top = l - s + "px"),
            (c.style.height = 2 * s + "px"),
            (c.style.width = 2 * s + "px"),
            null != r.color && (c.style.backgroundColor = r.color),
            (c.style.transitionDuration = `${u}ms`),
            this._containerElement.appendChild(c);
          const d = window.getComputedStyle(c),
            h = d.transitionDuration,
            p =
              "none" === d.transitionProperty ||
              "0s" === h ||
              "0s, 0s" === h ||
              (0 === i.width && 0 === i.height),
            m = new dV(this, c, r, p);
          (c.style.transform = "scale3d(1, 1, 1)"),
            (m.state = 0),
            r.persistent || (this._mostRecentTransientRipple = m);
          let y = null;
          return (
            !p &&
              (u || o.exitDuration) &&
              this._ngZone.runOutsideAngular(() => {
                const v = () => this._finishRippleTransition(m),
                  g = () => this._destroyRipple(m);
                c.addEventListener("transitionend", v),
                  c.addEventListener("transitioncancel", g),
                  (y = { onTransitionEnd: v, onTransitionCancel: g });
              }),
            this._activeRipples.set(m, y),
            (p || !u) && this._finishRippleTransition(m),
            m
          );
        }
        fadeOutRipple(e) {
          if (2 === e.state || 3 === e.state) return;
          const n = e.element,
            r = { ...rw, ...e.config.animation };
          (n.style.transitionDuration = `${r.exitDuration}ms`),
            (n.style.opacity = "0"),
            (e.state = 2),
            (e._animationForciblyDisabledThroughCss || !r.exitDuration) &&
              this._finishRippleTransition(e);
        }
        fadeOutAll() {
          this._getActiveRipples().forEach((e) => e.fadeOut());
        }
        fadeOutAllNonPersistent() {
          this._getActiveRipples().forEach((e) => {
            e.config.persistent || e.fadeOut();
          });
        }
        setupTriggerEvents(e) {
          const n = Hb(e);
          !this._platform.isBrowser ||
            !n ||
            n === this._triggerElement ||
            (this._removeTriggerEvents(),
            (this._triggerElement = n),
            ow.forEach((r) => {
              Hl._eventManager.addHandler(this._ngZone, r, n, this);
            }));
        }
        handleEvent(e) {
          "mousedown" === e.type
            ? this._onMousedown(e)
            : "touchstart" === e.type
            ? this._onTouchStart(e)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._ngZone.runOutsideAngular(() => {
                sw.forEach((n) => {
                  this._triggerElement.addEventListener(n, this, iw);
                });
              }),
              (this._pointerUpEventsRegistered = !0));
        }
        _finishRippleTransition(e) {
          0 === e.state
            ? this._startFadeOutTransition(e)
            : 2 === e.state && this._destroyRipple(e);
        }
        _startFadeOutTransition(e) {
          const n = e === this._mostRecentTransientRipple,
            { persistent: r } = e.config;
          (e.state = 1), !r && (!n || !this._isPointerDown) && e.fadeOut();
        }
        _destroyRipple(e) {
          const n = this._activeRipples.get(e) ?? null;
          this._activeRipples.delete(e),
            this._activeRipples.size || (this._containerRect = null),
            e === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            (e.state = 3),
            null !== n &&
              (e.element.removeEventListener(
                "transitionend",
                n.onTransitionEnd
              ),
              e.element.removeEventListener(
                "transitioncancel",
                n.onTransitionCancel
              )),
            e.element.remove();
        }
        _onMousedown(e) {
          const n = (function tV(t) {
              return 0 === t.buttons || (0 === t.offsetX && 0 === t.offsetY);
            })(e),
            r =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          !this._target.rippleDisabled &&
            !n &&
            !r &&
            ((this._isPointerDown = !0),
            this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig));
        }
        _onTouchStart(e) {
          if (
            !this._target.rippleDisabled &&
            !(function nV(t) {
              const e =
                (t.touches && t.touches[0]) ||
                (t.changedTouches && t.changedTouches[0]);
              return !(
                !e ||
                -1 !== e.identifier ||
                (null != e.radiusX && 1 !== e.radiusX) ||
                (null != e.radiusY && 1 !== e.radiusY)
              );
            })(e)
          ) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const n = e.changedTouches;
            for (let r = 0; r < n.length; r++)
              this.fadeInRipple(
                n[r].clientX,
                n[r].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._getActiveRipples().forEach((e) => {
              !e.config.persistent &&
                (1 === e.state ||
                  (e.config.terminateOnPointerUp && 0 === e.state)) &&
                e.fadeOut();
            }));
        }
        _getActiveRipples() {
          return Array.from(this._activeRipples.keys());
        }
        _removeTriggerEvents() {
          const e = this._triggerElement;
          e &&
            (ow.forEach((n) => Hl._eventManager.removeHandler(n, e, this)),
            this._pointerUpEventsRegistered &&
              sw.forEach((n) => e.removeEventListener(n, this, iw)));
        }
      }
      function uh(t, e, n) {
        const r = I(t) || e || n ? { next: t, error: e, complete: n } : t;
        return r
          ? ye((i, o) => {
              var s;
              null === (s = r.subscribe) || void 0 === s || s.call(r);
              let a = !0;
              i.subscribe(
                Te(
                  o,
                  (l) => {
                    var u;
                    null === (u = r.next) || void 0 === u || u.call(r, l),
                      o.next(l);
                  },
                  () => {
                    var l;
                    (a = !1),
                      null === (l = r.complete) || void 0 === l || l.call(r),
                      o.complete();
                  },
                  (l) => {
                    var u;
                    (a = !1),
                      null === (u = r.error) || void 0 === u || u.call(r, l),
                      o.error(l);
                  },
                  () => {
                    var l, u;
                    a &&
                      (null === (l = r.unsubscribe) ||
                        void 0 === l ||
                        l.call(r)),
                      null === (u = r.finalize) || void 0 === u || u.call(r);
                  }
                )
              );
            })
          : Ct;
      }
      function aw(t) {
        return ye((e, n) => {
          let o,
            r = null,
            i = !1;
          (r = e.subscribe(
            Te(n, void 0, void 0, (s) => {
              (o = nn(t(s, aw(t)(e)))),
                r ? (r.unsubscribe(), (r = null), o.subscribe(n)) : (i = !0);
            })
          )),
            i && (r.unsubscribe(), (r = null), o.subscribe(n));
        });
      }
      Hl._eventManager = new fV();
      class ch {}
      class cr {
        constructor(e) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            e
              ? (this.lazyInit =
                  "string" == typeof e
                    ? () => {
                        (this.headers = new Map()),
                          e.split("\n").forEach((n) => {
                            const r = n.indexOf(":");
                            if (r > 0) {
                              const i = n.slice(0, r),
                                o = i.toLowerCase(),
                                s = n.slice(r + 1).trim();
                              this.maybeSetNormalizedName(i, o),
                                this.headers.has(o)
                                  ? this.headers.get(o).push(s)
                                  : this.headers.set(o, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.entries(e).forEach(([n, r]) => {
                            let i;
                            if (
                              ((i =
                                "string" == typeof r
                                  ? [r]
                                  : "number" == typeof r
                                  ? [r.toString()]
                                  : r.map((o) => o.toString())),
                              i.length > 0)
                            ) {
                              const o = n.toLowerCase();
                              this.headers.set(o, i),
                                this.maybeSetNormalizedName(n, o);
                            }
                          });
                      })
              : (this.headers = new Map());
        }
        has(e) {
          return this.init(), this.headers.has(e.toLowerCase());
        }
        get(e) {
          this.init();
          const n = this.headers.get(e.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(e) {
          return this.init(), this.headers.get(e.toLowerCase()) || null;
        }
        append(e, n) {
          return this.clone({ name: e, value: n, op: "a" });
        }
        set(e, n) {
          return this.clone({ name: e, value: n, op: "s" });
        }
        delete(e, n) {
          return this.clone({ name: e, value: n, op: "d" });
        }
        maybeSetNormalizedName(e, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, e);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof cr
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
              (this.lazyUpdate = null)));
        }
        copyFrom(e) {
          e.init(),
            Array.from(e.headers.keys()).forEach((n) => {
              this.headers.set(n, e.headers.get(n)),
                this.normalizedNames.set(n, e.normalizedNames.get(n));
            });
        }
        clone(e) {
          const n = new cr();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof cr
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([e])),
            n
          );
        }
        applyUpdate(e) {
          const n = e.name.toLowerCase();
          switch (e.op) {
            case "a":
            case "s":
              let r = e.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(e.name, n);
              const i = ("a" === e.op ? this.headers.get(n) : void 0) || [];
              i.push(...r), this.headers.set(n, i);
              break;
            case "d":
              const o = e.value;
              if (o) {
                let s = this.headers.get(n);
                if (!s) return;
                (s = s.filter((a) => -1 === o.indexOf(a))),
                  0 === s.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, s);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        forEach(e) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              e(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class _V {
        encodeKey(e) {
          return uw(e);
        }
        encodeValue(e) {
          return uw(e);
        }
        decodeKey(e) {
          return decodeURIComponent(e);
        }
        decodeValue(e) {
          return decodeURIComponent(e);
        }
      }
      const DV = /%(\d[a-f0-9])/gi,
        EV = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function uw(t) {
        return encodeURIComponent(t).replace(DV, (e, n) => EV[n] ?? e);
      }
      function jl(t) {
        return `${t}`;
      }
      class Nr {
        constructor(e = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = e.encoder || new _V()),
            e.fromString)
          ) {
            if (e.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function vV(t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((i) => {
                      const o = i.indexOf("="),
                        [s, a] =
                          -1 == o
                            ? [e.decodeKey(i), ""]
                            : [
                                e.decodeKey(i.slice(0, o)),
                                e.decodeValue(i.slice(o + 1)),
                              ],
                        l = n.get(s) || [];
                      l.push(a), n.set(s, l);
                    }),
                n
              );
            })(e.fromString, this.encoder);
          } else
            e.fromObject
              ? ((this.map = new Map()),
                Object.keys(e.fromObject).forEach((n) => {
                  const r = e.fromObject[n],
                    i = Array.isArray(r) ? r.map(jl) : [jl(r)];
                  this.map.set(n, i);
                }))
              : (this.map = null);
        }
        has(e) {
          return this.init(), this.map.has(e);
        }
        get(e) {
          this.init();
          const n = this.map.get(e);
          return n ? n[0] : null;
        }
        getAll(e) {
          return this.init(), this.map.get(e) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(e, n) {
          return this.clone({ param: e, value: n, op: "a" });
        }
        appendAll(e) {
          const n = [];
          return (
            Object.keys(e).forEach((r) => {
              const i = e[r];
              Array.isArray(i)
                ? i.forEach((o) => {
                    n.push({ param: r, value: o, op: "a" });
                  })
                : n.push({ param: r, value: i, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(e, n) {
          return this.clone({ param: e, value: n, op: "s" });
        }
        delete(e, n) {
          return this.clone({ param: e, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((e) => {
                const n = this.encoder.encodeKey(e);
                return this.map
                  .get(e)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((e) => "" !== e)
              .join("&")
          );
        }
        clone(e) {
          const n = new Nr({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(e)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
              this.updates.forEach((e) => {
                switch (e.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === e.op ? this.map.get(e.param) : void 0) || [];
                    n.push(jl(e.value)), this.map.set(e.param, n);
                    break;
                  case "d":
                    if (void 0 === e.value) {
                      this.map.delete(e.param);
                      break;
                    }
                    {
                      let r = this.map.get(e.param) || [];
                      const i = r.indexOf(jl(e.value));
                      -1 !== i && r.splice(i, 1),
                        r.length > 0
                          ? this.map.set(e.param, r)
                          : this.map.delete(e.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class bV {
        constructor() {
          this.map = new Map();
        }
        set(e, n) {
          return this.map.set(e, n), this;
        }
        get(e) {
          return (
            this.map.has(e) || this.map.set(e, e.defaultValue()),
            this.map.get(e)
          );
        }
        delete(e) {
          return this.map.delete(e), this;
        }
        has(e) {
          return this.map.has(e);
        }
        keys() {
          return this.map.keys();
        }
      }
      function cw(t) {
        return typeof ArrayBuffer < "u" && t instanceof ArrayBuffer;
      }
      function dw(t) {
        return typeof Blob < "u" && t instanceof Blob;
      }
      function fw(t) {
        return typeof FormData < "u" && t instanceof FormData;
      }
      class vs {
        constructor(e, n, r, i) {
          let o;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = e.toUpperCase()),
            (function wV(t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || i
              ? ((this.body = void 0 !== r ? r : null), (o = i))
              : (o = r),
            o &&
              ((this.reportProgress = !!o.reportProgress),
              (this.withCredentials = !!o.withCredentials),
              o.responseType && (this.responseType = o.responseType),
              o.headers && (this.headers = o.headers),
              o.context && (this.context = o.context),
              o.params && (this.params = o.params)),
            this.headers || (this.headers = new cr()),
            this.context || (this.context = new bV()),
            this.params)
          ) {
            const s = this.params.toString();
            if (0 === s.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + s;
            }
          } else (this.params = new Nr()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : cw(this.body) ||
              dw(this.body) ||
              fw(this.body) ||
              (function CV(t) {
                return (
                  typeof URLSearchParams < "u" && t instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Nr
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || fw(this.body)
            ? null
            : dw(this.body)
            ? this.body.type || null
            : cw(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Nr
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(e = {}) {
          const n = e.method || this.method,
            r = e.url || this.url,
            i = e.responseType || this.responseType,
            o = void 0 !== e.body ? e.body : this.body,
            s =
              void 0 !== e.withCredentials
                ? e.withCredentials
                : this.withCredentials,
            a =
              void 0 !== e.reportProgress
                ? e.reportProgress
                : this.reportProgress;
          let l = e.headers || this.headers,
            u = e.params || this.params;
          const c = e.context ?? this.context;
          return (
            void 0 !== e.setHeaders &&
              (l = Object.keys(e.setHeaders).reduce(
                (d, f) => d.set(f, e.setHeaders[f]),
                l
              )),
            e.setParams &&
              (u = Object.keys(e.setParams).reduce(
                (d, f) => d.set(f, e.setParams[f]),
                u
              )),
            new vs(n, r, o, {
              params: u,
              headers: l,
              context: c,
              reportProgress: a,
              responseType: i,
              withCredentials: s,
            })
          );
        }
      }
      var ut = (() => (
        ((ut = ut || {})[(ut.Sent = 0)] = "Sent"),
        (ut[(ut.UploadProgress = 1)] = "UploadProgress"),
        (ut[(ut.ResponseHeader = 2)] = "ResponseHeader"),
        (ut[(ut.DownloadProgress = 3)] = "DownloadProgress"),
        (ut[(ut.Response = 4)] = "Response"),
        (ut[(ut.User = 5)] = "User"),
        ut
      ))();
      class MV {
        constructor(e, n = 200, r = "OK") {
          (this.headers = e.headers || new cr()),
            (this.status = void 0 !== e.status ? e.status : n),
            (this.statusText = e.statusText || r),
            (this.url = e.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class Ds extends MV {
        constructor(e = {}) {
          super(e),
            (this.type = ut.Response),
            (this.body = void 0 !== e.body ? e.body : null);
        }
        clone(e = {}) {
          return new Ds({
            body: void 0 !== e.body ? e.body : this.body,
            headers: e.headers || this.headers,
            status: void 0 !== e.status ? e.status : this.status,
            statusText: e.statusText || this.statusText,
            url: e.url || this.url || void 0,
          });
        }
      }
      function dh(t, e) {
        return {
          body: e,
          headers: t.headers,
          context: t.context,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let fh = (() => {
        class t {
          constructor(n) {
            this.handler = n;
          }
          request(n, r, i = {}) {
            let o;
            if (n instanceof vs) o = n;
            else {
              let l, u;
              (l = i.headers instanceof cr ? i.headers : new cr(i.headers)),
                i.params &&
                  (u =
                    i.params instanceof Nr
                      ? i.params
                      : new Nr({ fromObject: i.params })),
                (o = new vs(n, r, void 0 !== i.body ? i.body : null, {
                  headers: l,
                  context: i.context,
                  params: u,
                  reportProgress: i.reportProgress,
                  responseType: i.responseType || "json",
                  withCredentials: i.withCredentials,
                }));
            }
            const s = Rr(o).pipe(
              (function yV(t, e) {
                return I(e) ? Cs(t, e, 1) : Cs(t, 1);
              })((l) => this.handler.handle(l))
            );
            if (n instanceof vs || "events" === i.observe) return s;
            const a = s.pipe($b((l) => l instanceof Ds));
            switch (i.observe || "body") {
              case "body":
                switch (o.responseType) {
                  case "arraybuffer":
                    return a.pipe(
                      Ae((l) => {
                        if (null !== l.body && !(l.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return l.body;
                      })
                    );
                  case "blob":
                    return a.pipe(
                      Ae((l) => {
                        if (null !== l.body && !(l.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return l.body;
                      })
                    );
                  case "text":
                    return a.pipe(
                      Ae((l) => {
                        if (null !== l.body && "string" != typeof l.body)
                          throw new Error("Response is not a string.");
                        return l.body;
                      })
                    );
                  default:
                    return a.pipe(Ae((l) => l.body));
                }
              case "response":
                return a;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${i.observe}}`
                );
            }
          }
          delete(n, r = {}) {
            return this.request("DELETE", n, r);
          }
          get(n, r = {}) {
            return this.request("GET", n, r);
          }
          head(n, r = {}) {
            return this.request("HEAD", n, r);
          }
          jsonp(n, r) {
            return this.request("JSONP", n, {
              params: new Nr().append(r, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(n, r = {}) {
            return this.request("OPTIONS", n, r);
          }
          patch(n, r, i = {}) {
            return this.request("PATCH", n, dh(i, r));
          }
          post(n, r, i = {}) {
            return this.request("POST", n, dh(i, r));
          }
          put(n, r, i = {}) {
            return this.request("PUT", n, dh(i, r));
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(ch));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const zV = ["*"];
      let zl;
      function Es(t) {
        return (
          (function GV() {
            if (void 0 === zl && ((zl = null), typeof window < "u")) {
              const t = window;
              void 0 !== t.trustedTypes &&
                (zl = t.trustedTypes.createPolicy("angular#components", {
                  createHTML: (e) => e,
                }));
            }
            return zl;
          })()?.createHTML(t) || t
        );
      }
      function Dw(t) {
        return Error(`Unable to find icon with the name "${t}"`);
      }
      function Ew(t) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`
        );
      }
      function bw(t) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`
        );
      }
      class ii {
        constructor(e, n, r) {
          (this.url = e), (this.svgText = n), (this.options = r);
        }
      }
      let Gl = (() => {
        class t {
          constructor(n, r, i, o) {
            (this._httpClient = n),
              (this._sanitizer = r),
              (this._errorHandler = o),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = [
                "material-icons",
                "mat-ligature-font",
              ]),
              (this._document = i);
          }
          addSvgIcon(n, r, i) {
            return this.addSvgIconInNamespace("", n, r, i);
          }
          addSvgIconLiteral(n, r, i) {
            return this.addSvgIconLiteralInNamespace("", n, r, i);
          }
          addSvgIconInNamespace(n, r, i, o) {
            return this._addSvgIconConfig(n, r, new ii(i, null, o));
          }
          addSvgIconResolver(n) {
            return this._resolvers.push(n), this;
          }
          addSvgIconLiteralInNamespace(n, r, i, o) {
            const s = this._sanitizer.sanitize(ce.HTML, i);
            if (!s) throw bw(i);
            const a = Es(s);
            return this._addSvgIconConfig(n, r, new ii("", a, o));
          }
          addSvgIconSet(n, r) {
            return this.addSvgIconSetInNamespace("", n, r);
          }
          addSvgIconSetLiteral(n, r) {
            return this.addSvgIconSetLiteralInNamespace("", n, r);
          }
          addSvgIconSetInNamespace(n, r, i) {
            return this._addSvgIconSetConfig(n, new ii(r, null, i));
          }
          addSvgIconSetLiteralInNamespace(n, r, i) {
            const o = this._sanitizer.sanitize(ce.HTML, r);
            if (!o) throw bw(r);
            const s = Es(o);
            return this._addSvgIconSetConfig(n, new ii("", s, i));
          }
          registerFontClassAlias(n, r = n) {
            return this._fontCssClassesByAlias.set(n, r), this;
          }
          classNameForFontAlias(n) {
            return this._fontCssClassesByAlias.get(n) || n;
          }
          setDefaultFontSetClass(...n) {
            return (this._defaultFontSetClass = n), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(n) {
            const r = this._sanitizer.sanitize(ce.RESOURCE_URL, n);
            if (!r) throw Ew(n);
            const i = this._cachedIconsByUrl.get(r);
            return i
              ? Rr(ql(i))
              : this._loadSvgIconFromConfig(new ii(n, null)).pipe(
                  uh((o) => this._cachedIconsByUrl.set(r, o)),
                  Ae((o) => ql(o))
                );
          }
          getNamedSvgIcon(n, r = "") {
            const i = ww(r, n);
            let o = this._svgIconConfigs.get(i);
            if (o) return this._getSvgFromConfig(o);
            if (((o = this._getIconConfigFromResolvers(r, n)), o))
              return this._svgIconConfigs.set(i, o), this._getSvgFromConfig(o);
            const s = this._iconSetConfigs.get(r);
            return s
              ? this._getSvgFromIconSetConfigs(n, s)
              : (function mV(t, e) {
                  const n = I(t) ? t : () => t,
                    r = (i) => i.error(n());
                  return new Fe(e ? (i) => e.schedule(r, 0, i) : r);
                })(Dw(i));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(n) {
            return n.svgText
              ? Rr(ql(this._svgElementFromConfig(n)))
              : this._loadSvgIconFromConfig(n).pipe(Ae((r) => ql(r)));
          }
          _getSvgFromIconSetConfigs(n, r) {
            const i = this._extractIconWithNameFromAnySet(n, r);
            return i
              ? Rr(i)
              : (function KD(...t) {
                  const e = Nh(t),
                    { args: n, keys: r } = GD(t),
                    i = new Fe((o) => {
                      const { length: s } = n;
                      if (!s) return void o.complete();
                      const a = new Array(s);
                      let l = s,
                        u = s;
                      for (let c = 0; c < s; c++) {
                        let d = !1;
                        nn(n[c]).subscribe(
                          Te(
                            o,
                            (f) => {
                              d || ((d = !0), u--), (a[c] = f);
                            },
                            () => l--,
                            void 0,
                            () => {
                              (!l || !d) &&
                                (u || o.next(r ? WD(r, a) : a), o.complete());
                            }
                          )
                        );
                      }
                    });
                  return e ? i.pipe(qD(e)) : i;
                })(
                  r
                    .filter((s) => !s.svgText)
                    .map((s) =>
                      this._loadSvgIconSetFromConfig(s).pipe(
                        aw((a) => {
                          const u = `Loading icon set URL: ${this._sanitizer.sanitize(
                            ce.RESOURCE_URL,
                            s.url
                          )} failed: ${a.message}`;
                          return (
                            this._errorHandler.handleError(new Error(u)),
                            Rr(null)
                          );
                        })
                      )
                    )
                ).pipe(
                  Ae(() => {
                    const s = this._extractIconWithNameFromAnySet(n, r);
                    if (!s) throw Dw(n);
                    return s;
                  })
                );
          }
          _extractIconWithNameFromAnySet(n, r) {
            for (let i = r.length - 1; i >= 0; i--) {
              const o = r[i];
              if (o.svgText && o.svgText.toString().indexOf(n) > -1) {
                const s = this._svgElementFromConfig(o),
                  a = this._extractSvgIconFromSet(s, n, o.options);
                if (a) return a;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(n) {
            return this._fetchIcon(n).pipe(
              uh((r) => (n.svgText = r)),
              Ae(() => this._svgElementFromConfig(n))
            );
          }
          _loadSvgIconSetFromConfig(n) {
            return n.svgText
              ? Rr(null)
              : this._fetchIcon(n).pipe(uh((r) => (n.svgText = r)));
          }
          _extractSvgIconFromSet(n, r, i) {
            const o = n.querySelector(`[id="${r}"]`);
            if (!o) return null;
            const s = o.cloneNode(!0);
            if ((s.removeAttribute("id"), "svg" === s.nodeName.toLowerCase()))
              return this._setSvgAttributes(s, i);
            if ("symbol" === s.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(s), i);
            const a = this._svgElementFromString(Es("<svg></svg>"));
            return a.appendChild(s), this._setSvgAttributes(a, i);
          }
          _svgElementFromString(n) {
            const r = this._document.createElement("DIV");
            r.innerHTML = n;
            const i = r.querySelector("svg");
            if (!i) throw Error("<svg> tag not found");
            return i;
          }
          _toSvgElement(n) {
            const r = this._svgElementFromString(Es("<svg></svg>")),
              i = n.attributes;
            for (let o = 0; o < i.length; o++) {
              const { name: s, value: a } = i[o];
              "id" !== s && r.setAttribute(s, a);
            }
            for (let o = 0; o < n.childNodes.length; o++)
              n.childNodes[o].nodeType === this._document.ELEMENT_NODE &&
                r.appendChild(n.childNodes[o].cloneNode(!0));
            return r;
          }
          _setSvgAttributes(n, r) {
            return (
              n.setAttribute("fit", ""),
              n.setAttribute("height", "100%"),
              n.setAttribute("width", "100%"),
              n.setAttribute("preserveAspectRatio", "xMidYMid meet"),
              n.setAttribute("focusable", "false"),
              r && r.viewBox && n.setAttribute("viewBox", r.viewBox),
              n
            );
          }
          _fetchIcon(n) {
            const { url: r, options: i } = n,
              o = i?.withCredentials ?? !1;
            if (!this._httpClient)
              throw (function qV() {
                return Error(
                  "Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports."
                );
              })();
            if (null == r) throw Error(`Cannot fetch icon from URL "${r}".`);
            const s = this._sanitizer.sanitize(ce.RESOURCE_URL, r);
            if (!s) throw Ew(r);
            const a = this._inProgressUrlFetches.get(s);
            if (a) return a;
            const l = this._httpClient
              .get(s, { responseType: "text", withCredentials: o })
              .pipe(
                Ae((u) => Es(u)),
                (function gV(t) {
                  return ye((e, n) => {
                    try {
                      e.subscribe(n);
                    } finally {
                      n.add(t);
                    }
                  });
                })(() => this._inProgressUrlFetches.delete(s)),
                Xl()
              );
            return this._inProgressUrlFetches.set(s, l), l;
          }
          _addSvgIconConfig(n, r, i) {
            return this._svgIconConfigs.set(ww(n, r), i), this;
          }
          _addSvgIconSetConfig(n, r) {
            const i = this._iconSetConfigs.get(n);
            return i ? i.push(r) : this._iconSetConfigs.set(n, [r]), this;
          }
          _svgElementFromConfig(n) {
            if (!n.svgElement) {
              const r = this._svgElementFromString(n.svgText);
              this._setSvgAttributes(r, n.options), (n.svgElement = r);
            }
            return n.svgElement;
          }
          _getIconConfigFromResolvers(n, r) {
            for (let i = 0; i < this._resolvers.length; i++) {
              const o = this._resolvers[i](r, n);
              if (o)
                return KV(o) ? new ii(o.url, null, o.options) : new ii(o, null);
            }
          }
        }
        return (
          (t.ɵfac = function (n) {
            return new (n || t)(F(fh, 8), F(pf), F(lt, 8), F(kn));
          }),
          (t.ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function ql(t) {
        return t.cloneNode(!0);
      }
      function ww(t, e) {
        return t + ":" + e;
      }
      function KV(t) {
        return !(!t.url || !t.options);
      }
      const ZV = uV(
          class {
            constructor(t) {
              this._elementRef = t;
            }
          }
        ),
        QV = new C("MAT_ICON_DEFAULT_OPTIONS"),
        YV = new C("mat-icon-location", {
          providedIn: "root",
          factory: function XV() {
            const t = ve(lt),
              e = t ? t.location : null;
            return { getPathname: () => (e ? e.pathname + e.search : "") };
          },
        }),
        Cw = [
          "clip-path",
          "color-profile",
          "src",
          "cursor",
          "fill",
          "filter",
          "marker",
          "marker-start",
          "marker-mid",
          "marker-end",
          "mask",
          "stroke",
        ],
        JV = Cw.map((t) => `[${t}]`).join(", "),
        eB = /^url\(['"]?#(.*?)['"]?\)$/;
      let tB = (() => {
          class t extends ZV {
            get inline() {
              return this._inline;
            }
            set inline(n) {
              this._inline = (function FL(t) {
                return null != t && "false" != `${t}`;
              })(n);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(n) {
              n !== this._svgIcon &&
                (n
                  ? this._updateSvgIcon(n)
                  : this._svgIcon && this._clearSvgElement(),
                (this._svgIcon = n));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(n) {
              const r = this._cleanupFontValue(n);
              r !== this._fontSet &&
                ((this._fontSet = r), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(n) {
              const r = this._cleanupFontValue(n);
              r !== this._fontIcon &&
                ((this._fontIcon = r), this._updateFontIconClasses());
            }
            constructor(n, r, i, o, s, a) {
              super(n),
                (this._iconRegistry = r),
                (this._location = o),
                (this._errorHandler = s),
                (this._inline = !1),
                (this._previousFontSetClass = []),
                (this._currentIconFetch = de.EMPTY),
                a &&
                  (a.color && (this.color = this.defaultColor = a.color),
                  a.fontSet && (this.fontSet = a.fontSet)),
                i || n.nativeElement.setAttribute("aria-hidden", "true");
            }
            _splitIconName(n) {
              if (!n) return ["", ""];
              const r = n.split(":");
              switch (r.length) {
                case 1:
                  return ["", r[0]];
                case 2:
                  return r;
                default:
                  throw Error(`Invalid icon name: "${n}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const n = this._elementsWithExternalReferences;
              if (n && n.size) {
                const r = this._location.getPathname();
                r !== this._previousPath &&
                  ((this._previousPath = r), this._prependPathToReferences(r));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences &&
                  this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(n) {
              this._clearSvgElement();
              const r = this._location.getPathname();
              (this._previousPath = r),
                this._cacheChildrenWithExternalReferences(n),
                this._prependPathToReferences(r),
                this._elementRef.nativeElement.appendChild(n);
            }
            _clearSvgElement() {
              const n = this._elementRef.nativeElement;
              let r = n.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                r--;

              ) {
                const i = n.childNodes[r];
                (1 !== i.nodeType || "svg" === i.nodeName.toLowerCase()) &&
                  i.remove();
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const n = this._elementRef.nativeElement,
                r = (
                  this.fontSet
                    ? this._iconRegistry
                        .classNameForFontAlias(this.fontSet)
                        .split(/ +/)
                    : this._iconRegistry.getDefaultFontSetClass()
                ).filter((i) => i.length > 0);
              this._previousFontSetClass.forEach((i) => n.classList.remove(i)),
                r.forEach((i) => n.classList.add(i)),
                (this._previousFontSetClass = r),
                this.fontIcon !== this._previousFontIconClass &&
                  !r.includes("mat-ligature-font") &&
                  (this._previousFontIconClass &&
                    n.classList.remove(this._previousFontIconClass),
                  this.fontIcon && n.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(n) {
              return "string" == typeof n ? n.trim().split(" ")[0] : n;
            }
            _prependPathToReferences(n) {
              const r = this._elementsWithExternalReferences;
              r &&
                r.forEach((i, o) => {
                  i.forEach((s) => {
                    o.setAttribute(s.name, `url('${n}#${s.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(n) {
              const r = n.querySelectorAll(JV),
                i = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let o = 0; o < r.length; o++)
                Cw.forEach((s) => {
                  const a = r[o],
                    l = a.getAttribute(s),
                    u = l ? l.match(eB) : null;
                  if (u) {
                    let c = i.get(a);
                    c || ((c = []), i.set(a, c)),
                      c.push({ name: s, value: u[1] });
                  }
                });
            }
            _updateSvgIcon(n) {
              if (
                ((this._svgNamespace = null),
                (this._svgName = null),
                this._currentIconFetch.unsubscribe(),
                n)
              ) {
                const [r, i] = this._splitIconName(n);
                r && (this._svgNamespace = r),
                  i && (this._svgName = i),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(i, r)
                    .pipe(Ub(1))
                    .subscribe(
                      (o) => this._setSvgElement(o),
                      (o) => {
                        this._errorHandler.handleError(
                          new Error(
                            `Error retrieving icon ${r}:${i}! ${o.message}`
                          )
                        );
                      }
                    ));
              }
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)(
                E(Zt),
                E(Gl),
                (function Ys(t) {
                  return (function jM(t, e) {
                    if ("class" === e) return t.classes;
                    if ("style" === e) return t.styles;
                    const n = t.attrs;
                    if (n) {
                      const r = n.length;
                      let i = 0;
                      for (; i < r; ) {
                        const o = n[i];
                        if (Gh(o)) break;
                        if (0 === o) i += 2;
                        else if ("number" == typeof o)
                          for (i++; i < r && "string" == typeof n[i]; ) i++;
                        else {
                          if (o === e) return n[i + 1];
                          i += 2;
                        }
                      }
                    }
                    return null;
                  })(st(), t);
                })("aria-hidden"),
                E(YV),
                E(kn),
                E(QV, 8)
              );
            }),
            (t.ɵcmp = ci({
              type: t,
              selectors: [["mat-icon"]],
              hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
              hostVars: 8,
              hostBindings: function (n, r) {
                2 & n &&
                  (Bn(
                    "data-mat-icon-type",
                    r._usingFontIcon() ? "font" : "svg"
                  )("data-mat-icon-name", r._svgName || r.fontIcon)(
                    "data-mat-icon-namespace",
                    r._svgNamespace || r.fontSet
                  )("fontIcon", r._usingFontIcon() ? r.fontIcon : null),
                  Go("mat-icon-inline", r.inline)(
                    "mat-icon-no-color",
                    "primary" !== r.color &&
                      "accent" !== r.color &&
                      "warn" !== r.color
                  ));
              },
              inputs: {
                color: "color",
                inline: "inline",
                svgIcon: "svgIcon",
                fontSet: "fontSet",
                fontIcon: "fontIcon",
              },
              exportAs: ["matIcon"],
              features: [me],
              ngContentSelectors: zV,
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n &&
                  ((function my(t) {
                    const e = D()[ze][ft];
                    if (!e.projection) {
                      const r = (e.projection = bo(t ? t.length : 1, null)),
                        i = r.slice();
                      let o = e.child;
                      for (; null !== o; ) {
                        const s = t ? zT(o, t) : 0;
                        null !== s &&
                          (i[s] ? (i[s].projectionNext = o) : (r[s] = o),
                          (i[s] = o)),
                          (o = o.next);
                      }
                    }
                  })(),
                  (function gy(t, e = 0, n) {
                    const r = D(),
                      i = oe(),
                      o = ki(i, ie + t, 16, null, n || null);
                    null === o.projection && (o.projection = e),
                      Du(),
                      (!r[Xn] || yi()) &&
                        32 != (32 & o.flags) &&
                        (function $S(t, e, n) {
                          Am(
                            e[q],
                            0,
                            e,
                            n,
                            Qu(t, n, e),
                            wm(n.parent || e[ft], n, e)
                          );
                        })(i, r, o);
                  })(0));
              },
              styles: [
                ".mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}",
              ],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        nB = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = on({ type: t })),
            (t.ɵinj = zt({ imports: [tw, tw] })),
            t
          );
        })();
      var rB = te(123);
      function iB(t, e) {
        1 & t && (at(0, "mat-icon"), ln(1, "clear"), gt());
      }
      function oB(t, e) {
        1 & t && (at(0, "mat-icon"), ln(1, "format_list_bulleted"), gt());
      }
      let sB = (() => {
          class t {
            constructor() {
              (this.transparent = !0), (this._open = !1);
            }
            onWindowScroll() {
              this.transparent =
                (window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop) <= 150;
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ci({
              type: t,
              selectors: [["app-header"]],
              hostBindings: function (n, r) {
                1 & n &&
                  Yt(
                    "scroll",
                    function () {
                      return r.onWindowScroll();
                    },
                    0,
                    dg
                  );
              },
              decls: 12,
              vars: 6,
              consts: [
                [
                  1,
                  "shadow-md",
                  "p-2",
                  "mb-2",
                  "shadow-md",
                  "transition",
                  "duration-600",
                  "fixed",
                  "w-full",
                  "z-10",
                ],
                [
                  1,
                  "container",
                  "mx-auto",
                  "flex",
                  "justify-between",
                  "items-center",
                ],
                [
                  1,
                  "text-xl",
                  "font-bold",
                  "transition",
                  "duration-600",
                  "hover:text-pink-600",
                ],
                [
                  1,
                  "cursor-pointer",
                  "flex",
                  "items-center",
                  "md:hidden",
                  3,
                  "click",
                ],
                [4, "ngIf"],
                [1, "items-center", "md:flex"],
                [
                  "routerLink",
                  "/",
                  1,
                  "transition",
                  "duration-600",
                  "md:mr-6",
                  "hover:text-blue-600",
                ],
                [
                  "href",
                  "https://oxygen-project.xyz",
                  1,
                  "transition",
                  "duration-600",
                  "hover:text-blue-600",
                ],
              ],
              template: function (n, r) {
                1 & n &&
                  (at(0, "div", 0)(1, "div", 1)(2, "div", 2),
                  ln(3, "Jirayu.pw!"),
                  gt(),
                  at(4, "span", 3),
                  Yt("click", function () {
                    return (r._open = !r._open);
                  }),
                  ka(5, iB, 2, 0, "mat-icon", 4),
                  ka(6, oB, 2, 0, "mat-icon", 4),
                  gt(),
                  at(7, "div", 5)(8, "a", 6),
                  ln(9, "Home"),
                  gt(),
                  at(10, "a", 7),
                  ln(11, "Oxygen-Project"),
                  gt()()()()),
                  2 & n &&
                    (Jc(
                      r.transparent
                        ? "backdrop-blur-md"
                        : "bg-white text-[#000000]"
                    ),
                    qr(5),
                    zo("ngIf", r._open),
                    qr(1),
                    zo("ngIf", !r._open),
                    qr(1),
                    Jc(
                      r._open
                        ? "flex fixed flex-col rounded border p-2 bg-[#111111] text-white top-[56px] right-[16px]"
                        : "hidden"
                    ));
              },
              dependencies: [yD, tB],
            })),
            t
          );
        })(),
        aB = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ci({
              type: t,
              selectors: [["app-hero"]],
              decls: 6,
              vars: 0,
              consts: [
                [
                  1,
                  "bg-gradient-to-br",
                  "from-violet-500",
                  "to-fuchsia-500",
                  "flex",
                  "flex-col",
                  "justify-center",
                  "items-center",
                  "w-screen",
                  "h-[50vh]",
                  "md:h-[25vh]",
                ],
                [
                  "src",
                  "https://cdn.jirayu.pw/jirayu_logo.png",
                  "alt",
                  "Logo",
                  1,
                  "rounded-full",
                  "transition",
                  "duration-600",
                  "cursor",
                  "w-[128px]",
                  "h-[128px]",
                  "border",
                  "scale-[0.9]",
                  "mb-4",
                  "hover:scale-[1]",
                ],
                [1, "text-center", "text-2xl"],
                [1, "text-xl", "text-center"],
              ],
              template: function (n, r) {
                1 & n &&
                  (at(0, "div", 0),
                  La(1, "img", 1),
                  at(2, "h1", 2),
                  ln(3, "Jirayu Srisawat"),
                  gt(),
                  at(4, "p", 3),
                  ln(
                    5,
                    "\u0e08\u0e34\u0e23\u0e32\u0e22\u0e38 \u0e28\u0e23\u0e35\u0e2a\u0e27\u0e31\u0e2a\u0e14\u0e34\u0e4c"
                  ),
                  gt()());
              },
            })),
            t
          );
        })();
      function lB(t, e) {
        if (
          (1 & t &&
            (at(0, "div", 5)(1, "label", 6),
            ln(2),
            gt(),
            at(3, "p", 7),
            ln(4),
            gt()()),
          2 & t)
        ) {
          const n = e.$implicit;
          qr(2), ja(n.label), qr(2), ja(n.description);
        }
      }
      let uB = (() => {
          class t {
            constructor() {
              this.information = [
                {
                  label: "\u0e0a\u0e37\u0e48\u0e2d\u0e08\u0e23\u0e34\u0e07",
                  description:
                    "\u0e08\u0e34\u0e23\u0e32\u0e22\u0e38 \u0e28\u0e23\u0e35\u0e2a\u0e27\u0e31\u0e2a\u0e14\u0e34\u0e4c",
                },
                {
                  label: "\u0e0a\u0e37\u0e48\u0e2d\u0e40\u0e25\u0e48\u0e19",
                  description: "\u0e0b\u0e39\u0e01\u0e31\u0e2a",
                },
                {
                  label: "\u0e2d\u0e32\u0e22\u0e38",
                  description:
                    "13 \u0e1b\u0e35 1 \u0e40\u0e14\u0e37\u0e2d\u0e19",
                },
                {
                  label: "\u0e2a\u0e16\u0e32\u0e19\u0e30",
                  description:
                    "\u0e40\u0e1e\u0e37\u0e48\u0e2d\u0e19\u0e22\u0e31\u0e07\u0e44\u0e21\u0e48\u0e21\u0e35\u0e40\u0e25\u0e22\u0e04\u0e23\u0e31\u0e1a 55+",
                },
                {
                  label: "\u0e27\u0e31\u0e19\u0e40\u0e01\u0e34\u0e14",
                  description:
                    "13 \u0e40\u0e21\u0e29\u0e32\u0e22\u0e19 \u0e1e\u0e38\u0e17\u0e18\u0e28\u0e31\u0e01\u0e23\u0e32\u0e0a 2553",
                },
                {
                  label:
                    "\u0e28\u0e36\u0e01\u0e29\u0e32\u0e2d\u0e22\u0e39\u0e48\u0e17\u0e35\u0e48",
                  description:
                    "\u0e42\u0e23\u0e07\u0e40\u0e23\u0e35\u0e22\u0e19\u0e1a\u0e32\u0e07\u0e1b\u0e30\u0e2d\u0e34\u0e19 \u201c\u0e23\u0e32\u0e0a\u0e32\u0e19\u0e38\u0e40\u0e04\u0e23\u0e32\u0e30\u0e2b\u0e4c \u0e51\u201d \u0e0a\u0e31\u0e49\u0e19\u0e21\u0e31\u0e18\u0e22\u0e21\u0e28\u0e36\u0e01\u0e29\u0e32\u0e1b\u0e35\u0e17\u0e35\u0e48 2 \u0e2b\u0e49\u0e2d\u0e07\u0e40\u0e23\u0e35\u0e22\u0e19\u0e17\u0e35\u0e48 3 \u0e08\u0e32\u0e01\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14 11 \u0e2b\u0e49\u0e2d\u0e07\u0e40\u0e23\u0e35\u0e22\u0e19",
                },
                {
                  label:
                    "\u0e2d\u0e32\u0e28\u0e31\u0e22\u0e2d\u0e22\u0e39\u0e48\u0e17\u0e35\u0e48",
                  description:
                    "\u0e1e\u0e23\u0e30\u0e19\u0e04\u0e23\u0e28\u0e23\u0e35\u0e2d\u0e22\u0e38\u0e18\u0e22\u0e32 \u0e1b\u0e23\u0e30\u0e40\u0e17\u0e28\u0e44\u0e17\u0e22",
                },
                {
                  label:
                    "\u0e2d\u0e32\u0e2b\u0e32\u0e23\u0e17\u0e35\u0e48\u0e0a\u0e2d\u0e1a",
                  description:
                    "\u0e1c\u0e31\u0e14\u0e01\u0e23\u0e30\u0e40\u0e1e\u0e23\u0e32\u0e44\u0e02\u0e48\u0e14\u0e32\u0e27",
                },
                {
                  label:
                    "\u0e1c\u0e25\u0e44\u0e21\u0e49\u0e17\u0e35\u0e48\u0e0a\u0e2d\u0e1a",
                  description: "\u0e21\u0e30\u0e21\u0e48\u0e27\u0e07",
                },
                {
                  label: "\u0e2a\u0e35\u0e17\u0e35\u0e48\u0e0a\u0e2d\u0e1a",
                  description:
                    "\u0e2a\u0e35\u0e40\u0e02\u0e35\u0e22\u0e27, \u0e02\u0e32\u0e27, \u0e14\u0e33",
                },
                {
                  label: "\u0e40\u0e1b\u0e49\u0e32\u0e2b\u0e21\u0e32\u0e22?",
                  description:
                    "\u0e41\u0e04\u0e48\u0e2d\u0e22\u0e32\u0e01\u0e08\u0e30\u0e15\u0e34\u0e14\u0e17\u0e47\u0e2d\u0e1b 10 \u0e1e\u0e23\u0e49\u0e2d\u0e21\u0e40\u0e01\u0e23\u0e14\u0e40\u0e09\u0e25\u0e35\u0e48\u0e22 4 \u0e41\u0e25\u0e30 100 \u0e04\u0e30\u0e41\u0e19\u0e19\u0e17\u0e38\u0e01\u0e27\u0e34\u0e0a\u0e32\u0e04\u0e23\u0e31\u0e1a (\u0e2b\u0e27\u0e31\u0e07\u0e2a\u0e39\u0e07\u0e0a\u0e34\u0e1a\u0e2b\u0e32\u0e2255+)",
                },
              ];
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ci({
              type: t,
              selectors: [["app-about-me"]],
              decls: 7,
              vars: 1,
              consts: [
                [1, "container", "mx-auto"],
                [1, "text-center", "mb-1", "text-2xl"],
                [1, "text-center", "text-xl", "mb-12"],
                [1, "content"],
                [
                  "class",
                  "mx-auto w-[95%] my-1 rounded p-2 bg-[#111111] scale-[0.95] cursor-pointer transition duration-600 hover:bg-[#ffa42d] hover:text-white hover:scale-[1]",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [
                  1,
                  "mx-auto",
                  "w-[95%]",
                  "my-1",
                  "rounded",
                  "p-2",
                  "bg-[#111111]",
                  "scale-[0.95]",
                  "cursor-pointer",
                  "transition",
                  "duration-600",
                  "hover:bg-[#ffa42d]",
                  "hover:text-white",
                  "hover:scale-[1]",
                ],
                [
                  "for",
                  "desc",
                  1,
                  "text-white",
                  "text-sm",
                  "text-white",
                  "mb-1",
                ],
                ["id", "desc", 1, "pl-1", "text-md"],
              ],
              template: function (n, r) {
                1 & n &&
                  (at(0, "div", 0)(1, "h1", 1),
                  ln(2, "About me"),
                  gt(),
                  at(3, "p", 2),
                  ln(
                    4,
                    "\u0e21\u0e32\u0e17\u0e33\u0e04\u0e27\u0e32\u0e21\u0e23\u0e39\u0e49\u0e08\u0e31\u0e01\u0e01\u0e31\u0e1a\u0e1c\u0e21\u0e14\u0e35\u0e01\u0e27\u0e48\u0e32!"
                  ),
                  gt(),
                  at(5, "div", 3),
                  ka(6, lB, 5, 2, "div", 4),
                  gt()()),
                  2 & n && (qr(6), zo("ngForOf", r.information));
              },
              dependencies: [mD],
            })),
            t
          );
        })(),
        cB = (() => {
          class t {
            ngOnInit() {
              rB.init();
            }
          }
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵcmp = ci({
              type: t,
              selectors: [["app-root"]],
              decls: 3,
              vars: 0,
              template: function (n, r) {
                1 & n && La(0, "app-header")(1, "app-hero")(2, "app-about-me");
              },
              dependencies: [sB, aB, uB],
            })),
            t
          );
        })(),
        dB = (() => {
          class t {}
          return (
            (t.ɵfac = function (n) {
              return new (n || t)();
            }),
            (t.ɵmod = on({ type: t, bootstrap: [cB] })),
            (t.ɵinj = zt({ imports: [HD, Ck, EL, nB] })),
            t
          );
        })();
      dP()
        .bootstrapModule(dB)
        .catch((t) => console.error(t));
    },
    123: function (oo) {
      oo.exports = (function ($e) {
        function te(P) {
          if (I[P]) return I[P].exports;
          var ne = (I[P] = { exports: {}, id: P, loaded: !1 });
          return (
            $e[P].call(ne.exports, ne, ne.exports, te),
            (ne.loaded = !0),
            ne.exports
          );
        }
        var I = {};
        return (te.m = $e), (te.c = I), (te.p = "dist/"), te(0);
      })([
        function ($e, te, I) {
          "use strict";
          function P(B) {
            return B && B.__esModule ? B : { default: B };
          }
          var ne =
              Object.assign ||
              function (B) {
                for (var et = 1; et < arguments.length; et++) {
                  var wt = arguments[et];
                  for (var Ct in wt)
                    Object.prototype.hasOwnProperty.call(wt, Ct) &&
                      (B[Ct] = wt[Ct]);
                }
                return B;
              },
            de = (P(I(1)), I(6)),
            U = P(de),
            Q = P(I(7)),
            J = P(I(8)),
            Je = P(I(9)),
            pr = P(I(10)),
            Wn = P(I(11)),
            pn = P(I(14)),
            Et = [],
            wn = !1,
            Se = {
              offset: 120,
              delay: 0,
              easing: "ease",
              duration: 400,
              disable: !1,
              once: !1,
              startEvent: "DOMContentLoaded",
              throttleDelay: 99,
              debounceDelay: 50,
              disableMutationObserver: !1,
            },
            bt = function () {
              if (
                (arguments.length > 0 &&
                  void 0 !== arguments[0] &&
                  arguments[0] &&
                  (wn = !0),
                wn)
              )
                return (
                  (Et = (0, Wn.default)(Et, Se)),
                  (0, pr.default)(Et, Se.once),
                  Et
                );
            },
            Cn = function () {
              (Et = (0, pn.default)()), bt();
            };
          $e.exports = {
            init: function (B) {
              (Se = ne(Se, B)), (Et = (0, pn.default)());
              var et = document.all && !window.atob;
              return (function (B) {
                return (
                  !0 === B ||
                  ("mobile" === B && Je.default.mobile()) ||
                  ("phone" === B && Je.default.phone()) ||
                  ("tablet" === B && Je.default.tablet()) ||
                  ("function" == typeof B && !0 === B())
                );
              })(Se.disable) || et
                ? void Et.forEach(function (B, et) {
                    B.node.removeAttribute("data-aos"),
                      B.node.removeAttribute("data-aos-easing"),
                      B.node.removeAttribute("data-aos-duration"),
                      B.node.removeAttribute("data-aos-delay");
                  })
                : (Se.disableMutationObserver ||
                    J.default.isSupported() ||
                    (console.info(
                      '\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '
                    ),
                    (Se.disableMutationObserver = !0)),
                  document
                    .querySelector("body")
                    .setAttribute("data-aos-easing", Se.easing),
                  document
                    .querySelector("body")
                    .setAttribute("data-aos-duration", Se.duration),
                  document
                    .querySelector("body")
                    .setAttribute("data-aos-delay", Se.delay),
                  "DOMContentLoaded" === Se.startEvent &&
                  ["complete", "interactive"].indexOf(document.readyState) > -1
                    ? bt(!0)
                    : "load" === Se.startEvent
                    ? window.addEventListener(Se.startEvent, function () {
                        bt(!0);
                      })
                    : document.addEventListener(Se.startEvent, function () {
                        bt(!0);
                      }),
                  window.addEventListener(
                    "resize",
                    (0, Q.default)(bt, Se.debounceDelay, !0)
                  ),
                  window.addEventListener(
                    "orientationchange",
                    (0, Q.default)(bt, Se.debounceDelay, !0)
                  ),
                  window.addEventListener(
                    "scroll",
                    (0, U.default)(function () {
                      (0, pr.default)(Et, Se.once);
                    }, Se.throttleDelay)
                  ),
                  Se.disableMutationObserver ||
                    J.default.ready("[data-aos]", Cn),
                  Et);
            },
            refresh: bt,
            refreshHard: Cn,
          };
        },
        function ($e, te) {},
        ,
        ,
        ,
        ,
        function ($e, te) {
          (function (I) {
            "use strict";
            function P(S, ae, B) {
              function et(fe) {
                var tt = Nt,
                  In = ct;
                return (Nt = ct = void 0), (Te = fe), (We = S.apply(In, tt));
              }
              function mr(fe) {
                var tt = fe - ye;
                return (
                  void 0 === ye || tt >= ae || tt < 0 || (Ae && fe - Te >= Ut)
                );
              }
              function Mn() {
                var fe = O();
                return mr(fe)
                  ? Fe(fe)
                  : void (He = setTimeout(
                      Mn,
                      (function Ct(fe) {
                        var ws = ae - (fe - ye);
                        return Ae ? Cn(ws, Ut - (fe - Te)) : ws;
                      })(fe)
                    ));
              }
              function Fe(fe) {
                return (
                  (He = void 0), be && Nt ? et(fe) : ((Nt = ct = void 0), We)
                );
              }
              function tn() {
                var fe = O(),
                  tt = mr(fe);
                if (((Nt = arguments), (ct = this), (ye = fe), tt)) {
                  if (void 0 === He)
                    return (function wt(fe) {
                      return (
                        (Te = fe), (He = setTimeout(Mn, ae)), Sn ? et(fe) : We
                      );
                    })(ye);
                  if (Ae) return (He = setTimeout(Mn, ae)), et(ye);
                }
                return void 0 === He && (He = setTimeout(Mn, ae)), We;
              }
              var Nt,
                ct,
                Ut,
                We,
                He,
                ye,
                Te = 0,
                Sn = !1,
                Ae = !1,
                be = !0;
              if ("function" != typeof S) throw new TypeError(X);
              return (
                (ae = ge(ae) || 0),
                De(B) &&
                  ((Sn = !!B.leading),
                  (Ut = (Ae = "maxWait" in B)
                    ? bt(ge(B.maxWait) || 0, ae)
                    : Ut),
                  (be = "trailing" in B ? !!B.trailing : be)),
                (tn.cancel = function ai() {
                  void 0 !== He && clearTimeout(He),
                    (Te = 0),
                    (Nt = ye = ct = He = void 0);
                }),
                (tn.flush = function xr() {
                  return void 0 === He ? We : Fe(O());
                }),
                tn
              );
            }
            function De(S) {
              var ae = typeof S > "u" ? "undefined" : Q(S);
              return !!S && ("object" == ae || "function" == ae);
            }
            function U(S) {
              return (
                "symbol" == (typeof S > "u" ? "undefined" : Q(S)) ||
                ((function de(S) {
                  return (
                    !!S && "object" == (typeof S > "u" ? "undefined" : Q(S))
                  );
                })(S) &&
                  Se.call(S) == Ee)
              );
            }
            function ge(S) {
              if ("number" == typeof S) return S;
              if (U(S)) return J;
              if (De(S)) {
                var ae = "function" == typeof S.valueOf ? S.valueOf() : S;
                S = De(ae) ? ae + "" : ae;
              }
              if ("string" != typeof S) return 0 === S ? S : +S;
              S = S.replace(Je, "");
              var B = pr.test(S);
              return B || Or.test(S)
                ? Wn(S.slice(2), B ? 2 : 8)
                : Dt.test(S)
                ? J
                : +S;
            }
            var Q =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (S) {
                      return typeof S;
                    }
                  : function (S) {
                      return S &&
                        "function" == typeof Symbol &&
                        S.constructor === Symbol &&
                        S !== Symbol.prototype
                        ? "symbol"
                        : typeof S;
                    },
              X = "Expected a function",
              J = NaN,
              Ee = "[object Symbol]",
              Je = /^\s+|\s+$/g,
              Dt = /^[-+]0x[0-9a-f]+$/i,
              pr = /^0b[01]+$/i,
              Or = /^0o[0-7]+$/i,
              Wn = parseInt,
              jt =
                "object" == (typeof I > "u" ? "undefined" : Q(I)) &&
                I &&
                I.Object === Object &&
                I,
              pn =
                "object" == (typeof self > "u" ? "undefined" : Q(self)) &&
                self &&
                self.Object === Object &&
                self,
              Et = jt || pn || Function("return this")(),
              Se = Object.prototype.toString,
              bt = Math.max,
              Cn = Math.min,
              O = function () {
                return Et.Date.now();
              };
            $e.exports = function ne(S, ae, B) {
              var et = !0,
                wt = !0;
              if ("function" != typeof S) throw new TypeError(X);
              return (
                De(B) &&
                  ((et = "leading" in B ? !!B.leading : et),
                  (wt = "trailing" in B ? !!B.trailing : wt)),
                P(S, ae, { leading: et, maxWait: ae, trailing: wt })
              );
            };
          }).call(
            te,
            (function () {
              return this;
            })()
          );
        },
        function ($e, te) {
          (function (I) {
            "use strict";
            function ne(O) {
              var S = typeof O > "u" ? "undefined" : ge(O);
              return !!O && ("object" == S || "function" == S);
            }
            function de(O) {
              return (
                "symbol" == (typeof O > "u" ? "undefined" : ge(O)) ||
                ((function De(O) {
                  return (
                    !!O && "object" == (typeof O > "u" ? "undefined" : ge(O))
                  );
                })(O) &&
                  wn.call(O) == J)
              );
            }
            function U(O) {
              if ("number" == typeof O) return O;
              if (de(O)) return X;
              if (ne(O)) {
                var S = "function" == typeof O.valueOf ? O.valueOf() : O;
                O = ne(S) ? S + "" : S;
              }
              if ("string" != typeof O) return 0 === O ? O : +O;
              O = O.replace(Ee, "");
              var ae = Dt.test(O);
              return ae || pr.test(O)
                ? Or(O.slice(2), ae ? 2 : 8)
                : Je.test(O)
                ? X
                : +O;
            }
            var ge =
                "function" == typeof Symbol &&
                "symbol" == typeof Symbol.iterator
                  ? function (O) {
                      return typeof O;
                    }
                  : function (O) {
                      return O &&
                        "function" == typeof Symbol &&
                        O.constructor === Symbol &&
                        O !== Symbol.prototype
                        ? "symbol"
                        : typeof O;
                    },
              Q = "Expected a function",
              X = NaN,
              J = "[object Symbol]",
              Ee = /^\s+|\s+$/g,
              Je = /^[-+]0x[0-9a-f]+$/i,
              Dt = /^0b[01]+$/i,
              pr = /^0o[0-7]+$/i,
              Or = parseInt,
              Wn =
                "object" == (typeof I > "u" ? "undefined" : ge(I)) &&
                I &&
                I.Object === Object &&
                I,
              jt =
                "object" == (typeof self > "u" ? "undefined" : ge(self)) &&
                self &&
                self.Object === Object &&
                self,
              pn = Wn || jt || Function("return this")(),
              wn = Object.prototype.toString,
              Se = Math.max,
              bt = Math.min,
              Cn = function () {
                return pn.Date.now();
              };
            $e.exports = function P(O, S, ae) {
              function B(be) {
                var fe = tn,
                  tt = Nt;
                return (tn = Nt = void 0), (ye = be), (Ut = O.apply(tt, fe));
              }
              function Ct(be) {
                var fe = be - He;
                return (
                  void 0 === He || fe >= S || fe < 0 || (Sn && be - ye >= ct)
                );
              }
              function mr() {
                var be = Cn();
                return Ct(be)
                  ? Mn(be)
                  : void (We = setTimeout(
                      mr,
                      (function wt(be) {
                        var In = S - (be - He);
                        return Sn ? bt(In, ct - (be - ye)) : In;
                      })(be)
                    ));
              }
              function Mn(be) {
                return (
                  (We = void 0), Ae && tn ? B(be) : ((tn = Nt = void 0), Ut)
                );
              }
              function xr() {
                var be = Cn(),
                  fe = Ct(be);
                if (((tn = arguments), (Nt = this), (He = be), fe)) {
                  if (void 0 === We)
                    return (function et(be) {
                      return (
                        (ye = be), (We = setTimeout(mr, S)), Te ? B(be) : Ut
                      );
                    })(He);
                  if (Sn) return (We = setTimeout(mr, S)), B(He);
                }
                return void 0 === We && (We = setTimeout(mr, S)), Ut;
              }
              var tn,
                Nt,
                ct,
                Ut,
                We,
                He,
                ye = 0,
                Te = !1,
                Sn = !1,
                Ae = !0;
              if ("function" != typeof O) throw new TypeError(Q);
              return (
                (S = U(S) || 0),
                ne(ae) &&
                  ((Te = !!ae.leading),
                  (ct = (Sn = "maxWait" in ae)
                    ? Se(U(ae.maxWait) || 0, S)
                    : ct),
                  (Ae = "trailing" in ae ? !!ae.trailing : Ae)),
                (xr.cancel = function Fe() {
                  void 0 !== We && clearTimeout(We),
                    (ye = 0),
                    (tn = He = Nt = We = void 0);
                }),
                (xr.flush = function ai() {
                  return void 0 === We ? Ut : Mn(Cn());
                }),
                xr
              );
            };
          }).call(
            te,
            (function () {
              return this;
            })()
          );
        },
        function ($e, te) {
          "use strict";
          function I(ge) {
            var Q = void 0,
              X = void 0;
            for (Q = 0; Q < ge.length; Q += 1)
              if (
                ((X = ge[Q]).dataset && X.dataset.aos) ||
                (X.children && I(X.children))
              )
                return !0;
            return !1;
          }
          function P() {
            return (
              window.MutationObserver ||
              window.WebKitMutationObserver ||
              window.MozMutationObserver
            );
          }
          function de(ge) {
            ge &&
              ge.forEach(function (Q) {
                var X = Array.prototype.slice.call(Q.addedNodes),
                  J = Array.prototype.slice.call(Q.removedNodes);
                if (I(X.concat(J))) return U();
              });
          }
          Object.defineProperty(te, "__esModule", { value: !0 });
          var U = function () {};
          te.default = {
            isSupported: function ne() {
              return !!P();
            },
            ready: function De(ge, Q) {
              var X = window.document,
                Ee = new (P())(de);
              (U = Q),
                Ee.observe(X.documentElement, {
                  childList: !0,
                  subtree: !0,
                  removedNodes: !0,
                });
            },
          };
        },
        function ($e, te) {
          "use strict";
          function P() {
            return (
              navigator.userAgent || navigator.vendor || window.opera || ""
            );
          }
          Object.defineProperty(te, "__esModule", { value: !0 });
          var ne = (function () {
              function X(J, Ee) {
                for (var Je = 0; Je < Ee.length; Je++) {
                  var Dt = Ee[Je];
                  (Dt.enumerable = Dt.enumerable || !1),
                    (Dt.configurable = !0),
                    "value" in Dt && (Dt.writable = !0),
                    Object.defineProperty(J, Dt.key, Dt);
                }
              }
              return function (J, Ee, Je) {
                return Ee && X(J.prototype, Ee), Je && X(J, Je), J;
              };
            })(),
            De =
              /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
            de =
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            U =
              /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
            ge =
              /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
            Q = (function () {
              function X() {
                !(function I(X, J) {
                  if (!(X instanceof J))
                    throw new TypeError("Cannot call a class as a function");
                })(this, X);
              }
              return (
                ne(X, [
                  {
                    key: "phone",
                    value: function () {
                      var J = P();
                      return !(!De.test(J) && !de.test(J.substr(0, 4)));
                    },
                  },
                  {
                    key: "mobile",
                    value: function () {
                      var J = P();
                      return !(!U.test(J) && !ge.test(J.substr(0, 4)));
                    },
                  },
                  {
                    key: "tablet",
                    value: function () {
                      return this.mobile() && !this.phone();
                    },
                  },
                ]),
                X
              );
            })();
          te.default = new Q();
        },
        function ($e, te) {
          "use strict";
          Object.defineProperty(te, "__esModule", { value: !0 });
          te.default = function (ne, De) {
            var de = window.pageYOffset,
              U = window.innerHeight;
            ne.forEach(function (ge, Q) {
              !(function (ne, De, de) {
                var U = ne.node.getAttribute("data-aos-once");
                De > ne.position
                  ? ne.node.classList.add("aos-animate")
                  : typeof U < "u" &&
                    ("false" === U || (!de && "true" !== U)) &&
                    ne.node.classList.remove("aos-animate");
              })(ge, U + de, De);
            });
          };
        },
        function ($e, te, I) {
          "use strict";
          Object.defineProperty(te, "__esModule", { value: !0 });
          var De = (function P(U) {
            return U && U.__esModule ? U : { default: U };
          })(I(12));
          te.default = function (U, ge) {
            return (
              U.forEach(function (Q, X) {
                Q.node.classList.add("aos-init"),
                  (Q.position = (0, De.default)(Q.node, ge.offset));
              }),
              U
            );
          };
        },
        function ($e, te, I) {
          "use strict";
          Object.defineProperty(te, "__esModule", { value: !0 });
          var De = (function P(U) {
            return U && U.__esModule ? U : { default: U };
          })(I(13));
          te.default = function (U, ge) {
            var Q = 0,
              X = 0,
              J = window.innerHeight,
              Ee = {
                offset: U.getAttribute("data-aos-offset"),
                anchor: U.getAttribute("data-aos-anchor"),
                anchorPlacement: U.getAttribute("data-aos-anchor-placement"),
              };
            switch (
              (Ee.offset && !isNaN(Ee.offset) && (X = parseInt(Ee.offset)),
              Ee.anchor &&
                document.querySelectorAll(Ee.anchor) &&
                (U = document.querySelectorAll(Ee.anchor)[0]),
              (Q = (0, De.default)(U).top),
              Ee.anchorPlacement)
            ) {
              case "top-bottom":
                break;
              case "center-bottom":
                Q += U.offsetHeight / 2;
                break;
              case "bottom-bottom":
                Q += U.offsetHeight;
                break;
              case "top-center":
                Q += J / 2;
                break;
              case "bottom-center":
                Q += J / 2 + U.offsetHeight;
                break;
              case "center-center":
                Q += J / 2 + U.offsetHeight / 2;
                break;
              case "top-top":
                Q += J;
                break;
              case "bottom-top":
                Q += U.offsetHeight + J;
                break;
              case "center-top":
                Q += U.offsetHeight / 2 + J;
            }
            return (
              Ee.anchorPlacement || Ee.offset || isNaN(ge) || (X = ge), Q + X
            );
          };
        },
        function ($e, te) {
          "use strict";
          Object.defineProperty(te, "__esModule", { value: !0 }),
            (te.default = function (P) {
              for (
                var ne = 0, De = 0;
                P && !isNaN(P.offsetLeft) && !isNaN(P.offsetTop);

              )
                (ne += P.offsetLeft - ("BODY" != P.tagName ? P.scrollLeft : 0)),
                  (De += P.offsetTop - ("BODY" != P.tagName ? P.scrollTop : 0)),
                  (P = P.offsetParent);
              return { top: De, left: ne };
            });
        },
        function ($e, te) {
          "use strict";
          Object.defineProperty(te, "__esModule", { value: !0 }),
            (te.default = function (P) {
              return (
                (P = P || document.querySelectorAll("[data-aos]")),
                Array.prototype.map.call(P, function (ne) {
                  return { node: ne };
                })
              );
            });
        },
      ]);
    },
  },
  (oo) => {
    oo((oo.s = 282));
  },
]);
