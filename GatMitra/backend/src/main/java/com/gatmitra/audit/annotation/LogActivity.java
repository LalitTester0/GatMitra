package com.gatmitra.audit.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation used to mark methods for automatic activity logging.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface LogActivity {
    
    /**
     * Name of the module being accessed (e.g., "MEMBER", "BACHAT_GAT")
     */
    String moduleName();

    /**
     * Type of activity (e.g., "CREATE", "UPDATE", "DELETE")
     */
    String activityType();
}
