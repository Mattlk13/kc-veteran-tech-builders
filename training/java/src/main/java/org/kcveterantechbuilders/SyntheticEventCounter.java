package org.kcveterantechbuilders;

import java.util.List;

/**
 * Training-only example: aggregate anonymized synthetic event counts.
 * Never process applicant names, email, protected benefits information or live production data.
 */
public final class SyntheticEventCounter {
    private SyntheticEventCounter() {}
    public static long total(List<Integer> dailyCounts) {
        if (dailyCounts == null || dailyCounts.size() < 1) {
            throw new IllegalArgumentException("At least one day required");
        }
        long sum = 0;
        for (Integer n : dailyCounts) {
            if (n == null || n < 0) throw new IllegalArgumentException("Nonnegative counts only");
            sum = Math.addExact(sum, n.longValue());
        }
        return sum;
    }
}
