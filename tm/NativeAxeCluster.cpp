#include "NativeAxeCluster.h"

namespace facebook::react {

NativeAxeCluster::NativeAxeCluster(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeAxeClusterCxxSpec(std::move(jsInvoker)) {}

std::string NativeAxeCluster::reverseString(jsi::Runtime& rt, std::string input) {
  return std::string(input.rbegin(), input.rend());
}

} // namespace facebook::react