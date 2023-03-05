package com.ecommerce.Entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.Nationalized;
import org.hibernate.annotations.Where;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
//@Where(clause = "is_deleted = false")
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity implements Serializable, UserDetails {
    @Serial
    private static final long serialVersionUID = 1L;
    private String userName;
    private String firstName;
    private String lastName;
    private String passwordHash;
    private String phoneNumber;
    private String address;
    private String email;
    private boolean isEmailVerified;
    private Date dob;
    private int gender;
    private boolean isBlock;
    @Column(name = "user_type", nullable = true)
    private int userType;
    @Nullable
    private Date lastLogin;

    @Getter
    @Setter
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<UserRole> user_roles;
    @Transient
    private Collection<? extends GrantedAuthority> authorities;

    public User(UUID id, String username, String email, String password,
                Collection<? extends GrantedAuthority> authorities) {
        super(id);
        this.userName = username;
        this.email = email;
        this.passwordHash = password;
        this.authorities = authorities;
    }

    public static User build(User user) {
        List<GrantedAuthority> authorities = user.getUser_roles() != null ? user.getUser_roles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole().getName()))
                .collect(Collectors.toList()) : Collections.emptyList();

        return new User(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPasswordHash(),
                authorities);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities1 = getUser_roles() != null ? getUser_roles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getRole().getName()))
                .collect(Collectors.toList()) : Collections.emptyList();
        return authorities1;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEmailVerified;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        User user = (User) o;
        return Objects.equals(getId(), user.getId());
    }
}
