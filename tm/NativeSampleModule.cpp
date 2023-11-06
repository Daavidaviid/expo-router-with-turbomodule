#include "NativeSampleModule.h"

namespace facebook::react {

NativeSampleModule::NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeSampleModuleCxxSpec(std::move(jsInvoker)) {}

std::string NativeSampleModule::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

CustomType NativeSampleModule::passCustomType(jsi::Runtime& rt, CustomType input) {
  input.key = "1909";
  input.enabled = !input.enabled;
  input.timestamp = 42;
  return input;
}

std::string NativeSampleModule::getFrenchHello(jsi::Runtime& rt) {
  return "Bonjour";
}

} // namespace facebook::react