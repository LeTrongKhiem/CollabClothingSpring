package com.ecommerce.Application.Extensions;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class DateTimeExtensions {
    public static Date convertDateTime(Long value) {
        Timestamp stamp = new Timestamp(value);
        return new Date(stamp.getTime());
    }
}
