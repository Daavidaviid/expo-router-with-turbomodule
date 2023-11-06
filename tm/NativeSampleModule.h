#pragma once

#if __has_include(<React-Codegen/AppSpecsJSI.h>) // CocoaPod headers on Apple
#include <React-Codegen/AppSpecsJSI.h>
#elif __has_include("AppSpecsJSI.h") // CMake headers on Android
#include "AppSpecsJSI.h"
#endif
#include <memory>
#include <string>

namespace facebook::react {

using CustomType = NativeSampleModuleBaseCustomType<std::string, bool, int32_t>;
template <>
struct Bridging<CustomType>
    : NativeSampleModuleBaseCustomTypeBridging<std::string, bool, int32_t> {};

class NativeSampleModule : public NativeSampleModuleCxxSpec<NativeSampleModule> {
 public:
  NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

  std::string reverseString(jsi::Runtime& rt, std::string input);
  CustomType passCustomType(jsi::Runtime& rt, CustomType input);
  std::string getFrenchHello(jsi::Runtime& rt);
};

} // namespace facebook::react