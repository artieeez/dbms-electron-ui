#include <node_api.h>

napi_value init(napi_env env, napi_value exports) {
  napi_value foo;

  napi_create_int64(env, 35, &foo);

  return foo;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init);
