package org.kcveterantechbuilders;

import java.util.List;

/** Runnable smoke test without external test libraries. */
public final class SyntheticEventCounterTest {
    public static void main(String[] args) {
        if (SyntheticEventCounter.total(List.of(1, 2, 3)) != 6L) throw new AssertionError("sum incorrect");
        boolean denied = false;
        try { SyntheticEventCounter.total(List.of(1, -1)); }
        catch (IllegalArgumentException expected) { denied = true; }
        if (!denied) throw new AssertionError("negative counts were accepted");
        System.out.println("Synthetic Java event training: 2 smoke cases passed");
    }
}
