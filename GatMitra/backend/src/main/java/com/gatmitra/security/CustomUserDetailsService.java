package com.gatmitra.security;

import com.gatmitra.member.entity.Member;
import com.gatmitra.member.repository.MemberRepository;
import com.gatmitra.user.entity.User;
import com.gatmitra.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String mobileNumber) throws UsernameNotFoundException {
        Optional<User> userOpt = userRepository.findByMobileNumber(mobileNumber);
        if (userOpt.isPresent()) {
            return new CustomUserDetails(userOpt.get());
        }

        Optional<Member> memberOpt = memberRepository.findByMobileNumber(mobileNumber);
        if (memberOpt.isPresent()) {
            return new CustomUserDetails(memberOpt.get());
        }

        throw new UsernameNotFoundException("User/Member not found with mobile number: " + mobileNumber);
    }
}
