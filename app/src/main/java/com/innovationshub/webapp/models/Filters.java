package com.innovationshub.webapp.models;

import java.util.Map;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import com.innovationshub.webapp.common.IHConstants;
import lombok.Data;

/**
 * @author Sid
 * @since Jun 24, 2020 01:45
 */
@Data
public class Filters {

    Object id;
    Object value;

    public Filters(Map idValueMap) {
        if (null != idValueMap) {
            this.id = idValueMap.get(IHConstants.KEY_ID);
            this.value = idValueMap.get(IHConstants.KEY_VALUE);
        }
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof Filters)) {
            return false;
        }
        final Filters bean = (Filters) obj;
        EqualsBuilder equalsBuilder =new EqualsBuilder();
        equalsBuilder.append(this.id, bean.id);
        return equalsBuilder.isEquals();
    }

    @Override
    public int hashCode() {
        HashCodeBuilder hashCodeBuilder = new HashCodeBuilder();
        hashCodeBuilder.append(this.id);
        return hashCodeBuilder.toHashCode();
    }

}
