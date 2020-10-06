package io.haidelbert.backends.accounting;

import java.util.EnumSet;

public final class CategoryHelper {
    private CategoryHelper(){}

    private static final EnumSet<Category> revenueCategories = EnumSet.of(Category.REVENUE_SELLS, Category.REVENUE_SERVICES);

    public static boolean isRevenueCategory(Category c) {
        return revenueCategories.contains(c);
    }

    public static boolean isExpenditureCategory(Category c) {
        return !revenueCategories.contains(c);
    }
}
